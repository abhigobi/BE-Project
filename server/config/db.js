const mysql = require('mysql2');
require('dotenv').config();

const createDatabaseIfNotExists = async () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Important for Railway
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err.message);
      return;
    }

    console.log('Connected to MySQL server.');

    connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
      if (err) {
        console.error('Error creating database:', err.message);
      } else {
        console.log(`Database "${process.env.DB_NAME}" is ready.`);
      }
      connection.end();
    });
  });
};

createDatabaseIfNotExists();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.on('connection', () => {
  console.log('Database connected successfully!');
});

pool.on('error', (err) => {
  console.error('Failed to connect to the database:', err.message);
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting connection from pool:', err.message);
  } else {
    console.log('Successfully acquired connection from pool.');
    connection.release();
  }
});

module.exports = pool.promise();
