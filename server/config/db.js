const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Listen for the 'connection' event (successful connection)
pool.on('connection', (connection) => {
  console.log('Database connected successfully!');
});

// Listen for the 'error' event (connection error)
pool.on('error', (err) => {
  console.error('Failed to connect to the database:', err.message);
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error getting connection from pool:', err.message);
  } else {
    console.log('Successfully acquired connection from pool.');
    connection.release(); // Release the connection back to the pool
  }
});

module.exports = pool.promise(); // Use promises for async/await