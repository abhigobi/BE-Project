const Student = require('../models/Student');
const CommonCompliancePdfForStudent = require('../models/CommonCompliancePdfForStudent');
const bcrypt = require('bcrypt');

const getAllFiles = async (req, res) => {
    try {
        const [files] = await CommonCompliancePdfForStudent.getAllFiles();
        res.status(200).json({ success: true, files });
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ error: "Failed to fetch files" });
    }
};

module.exports = { getAllFiles};