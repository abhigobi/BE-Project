const Student = require('../models/Student');
const bcrypt = require('bcrypt');

const loginStudent = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the student by email
        const student = await Student.findByEmail(email);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If everything is correct, return a success response
        res.status(200).json({ message: 'Login successful', student: { id: student.id, name: student.name, email: student.email } });
    } catch (error) {
        console.error('Error in loginStudent:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { loginStudent };