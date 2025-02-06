const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Warden = require('../models/Warden');
const bcrypt = require('bcrypt');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Search for the user in all tables
        const student = await Student.findByEmail(email);
        const teacher = await Teacher.findByEmail(email);
        const warden = await Warden.findByEmail(email);

        // Check which table the user belongs to
        let user = null;
        let table = null;

        if (student && (await bcrypt.compare(password, student.password))) {
            user = student;
            table = 'Student';
        } else if (teacher && (await bcrypt.compare(password, teacher.password))) {
            user = teacher;
            table = 'Teacher';
        } else if (warden && (await bcrypt.compare(password, warden.password))) {
            user = warden;
            table = 'Warden';
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Return the table name and user data (excluding the password)
        const { password: _, ...userData } = user; // Exclude password from the response
        res.status(200).json({ table, user: userData });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { loginUser };