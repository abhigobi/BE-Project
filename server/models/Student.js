const db = require('../config/db');
const bcrypt = require('bcrypt');
const { sendWelcomeEmailToStudent } = require('../services/emailService'); // Import the email service

class Student {
    static async ensureTableExists() {
        // Create Student table if it doesn't exist
        await db.query(`
            CREATE TABLE IF NOT EXISTS Student (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
    }

    static async create(student) {
        await this.ensureTableExists();
        const { name, email, password } = student;
        // Hash the password
        const saltRounds = 10; // Number of salt rounds for hashing
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the student with the hashed password
        const [result] = await db.query(
            'INSERT INTO Student (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );
        await sendWelcomeEmailToStudent(email, name, password);
        return result.insertId;
    }
    static async bulkCreate(students) {
        await this.ensureTableExists();

        // Prepare student data with hashed passwords
        const hashedStudents = await Promise.all(
            students.map(async ({ name, email, password }) => {
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                return [name, email, hashedPassword];
            })
        );

        const query = 'INSERT INTO Student (name, email, password) VALUES ?';

        try {
            const [result] = await db.query(query, [hashedStudents]);

            // Send emails after successful insert
            await Promise.allSettled(
                students.map(({ name, email, password }) =>
                    sendWelcomeEmailToStudent(email, name, password)
                        .then(() => console.log(`Email sent to ${email}`))
                        .catch((err) => console.error(`Email failed for ${email}`, err))
                )
            );

            return result.affectedRows;

        } catch (err) {
            console.error('Bulk insert failed:', err.message);
            throw err; // rethrow so calling code can handle it
        }
    }

    // New method: Find a student by email
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM Student WHERE email = ?', [email]);
        return rows[0]; // Return the first matching student
    }

    static async getAllStudents() {
        return await db.query('SELECT id, name, email FROM Student');
    }

    static async getAllStudentIds() {
        const [rows] = await db.query('SELECT id FROM Student');
        return rows.map((row) => row.id);
    }

    static async deleteStudent(id) {
        await this.ensureTableExists();
        const [result] = await db.query('DELETE FROM Student WHERE id = ?', [id]);
        return result.affectedRows > 0; // Return true if a student was deleted
    }
}

module.exports = Student;