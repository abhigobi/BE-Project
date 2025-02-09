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
const toggleFileStatus = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the current status of the file
        const [file] = await CommonCompliancePdfForStudent.getFileById(id);

        if (file.length === 0) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        const currentStatus = file[0].status;

        // Check if the current status is "Completed"
        if (currentStatus === 'Completed') {
            return res.status(400).json({ success: false, message: "Cannot toggle status of a completed file" });
        }

        // Determine the new status
        let newStatus;
        if (currentStatus === 'Pending') {
            newStatus = 'Waiting For Approve';
        } else if (currentStatus === 'Waiting For Approve') {
            newStatus = 'Pending';
        } else {
            return res.status(400).json({ success: false, message: "Invalid current status" });
        }

        // Update the status in the database
        await CommonCompliancePdfForStudent.updateFileStatus(id, newStatus);

        res.status(200).json({ success: true, message: "Status toggled successfully", newStatus });
    } catch (error) {
        console.error("Error toggling file status:", error);
        res.status(500).json({ success: false, message: "Failed to toggle file status" });
    }
};
module.exports = { getAllFiles, toggleFileStatus };