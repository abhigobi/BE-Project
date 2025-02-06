const db = require('../config/db');
const bcrypt = require('bcrypt');

class Warden {
    static async create(Warden) {
        const { name, email, password } = Warden;

        // Hash the password
        const saltRounds = 10; // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the Warden with the hashed password
        const [result] = await db.query(
            'INSERT INTO Warden (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        return result.insertId;
    }

    static async bulkCreate(Wardens) {
        const query = 'INSERT INTO Warden (name, email, password) VALUES ?';

        // Hash passwords for all Wardens
        const hashedWardens = await Promise.all(
            Wardens.map(async (Warden) => {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(Warden.password, saltRounds);
                return [Warden.name, Warden.email, hashedPassword];
            })
        );

        // Insert all Wardens with hashed passwords
        const [result] = await db.query(query, [hashedWardens]);
        return result.affectedRows;
    }

    // New method: Find a Warden by email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM Warden WHERE email = ?', [email]);
        return rows[0]; // Return the first matching Warden
    }
}

module.exports = Warden;