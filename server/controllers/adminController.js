const Student = require('../models/Student');
const xlsx = require('xlsx');
const fs = require('fs'); // Import the file system module
const uploadExcelFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Read the uploaded Excel file
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Insert data into the database
        const result = await Student.bulkCreate(data);

        // Delete the uploaded file after successful insertion
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error('Failed to delete file:', err.message);
            } else {
                console.log('File deleted successfully:', req.file.path);
            }
        });

        res.status(200).json({ message: `${result} records inserted successfully` });
    } catch (error) {
        // Delete the uploaded file if an error occurs
        if (req.file) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Failed to delete file:', err.message);
                } else {
                    console.log('File deleted successfully:', req.file.path);
                }
            });
        }

        res.status(500).json({ error: error.message });
    }
};

module.exports = { uploadExcelFile };