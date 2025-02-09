const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');
const CommonCompliancePdfForStudent = require('../models/CommonCompliancePdfForStudent');
const uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

        const filePath = path.join(__dirname, '..', req.file.path);

        // Upload PDF to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "raw",
            folder: "pdf_uploads"
        });

        // Save file info in the database
        await CommonCompliancePdfForStudent.saveFile(req.file.originalname.replace(/\.pdf$/i, ''), result.secure_url);
        // Delete the local file after upload
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("⚠️ Error deleting local file:", err);
            } else {
                console.log("Local file deleted:", filePath);
            }
        });

        res.status(201).json({ message: 'File uploaded successfully', url: result.secure_url });

    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: 'File upload failed' });
    }
};
const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "File ID is required" });
        }
        // Fetch file from DB
        const [files] = await CommonCompliancePdfForStudent.getFileById(id);
        if (files.length === 0) {
            return res.status(404).json({ error: "File not found" });
        }

        const fileUrl = files[0].url;
        const urlParts = fileUrl.split('/');
        const fileNameWithExt = urlParts[urlParts.length - 1].split('?')[0]; // Remove query params

        // Extract public ID by removing the extension (.pdf)
        let publicId = `pdf_uploads/${fileNameWithExt.replace(/\.pdf$/, '')}`; // Ensure the .pdf extension is removed
        publicId = `${publicId}.pdf`;
        // Delete from Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.destroy(publicId, { resource_type: "raw", type: "upload" });

        if (cloudinaryResponse.result !== "ok") {
            return res.status(500).json({ error: "Cloudinary deletion failed" });
        }

        // Delete from Database
        await CommonCompliancePdfForStudent.deleteFile(id);

        res.status(200).json({ success: true, message: "File deleted successfully" });

    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ error: "Failed to delete file" });
    }
};

const updateFileStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate the status
    const allowedStatuses = ['Pending', 'Completed', 'Waiting For Approve', 'Rejected'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status provided" });
    }

    try {
        // Fetch the file to ensure it exists
        const [file] = await CommonCompliancePdfForStudent.getFileById(id);

        if (file.length === 0) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        // Update the status in the database
        await CommonCompliancePdfForStudent.updateFileStatus(id, status);

        res.status(200).json({ success: true, message: "Status updated successfully", newStatus: status });
    } catch (error) {
        console.error("Error updating file status:", error);
        res.status(500).json({ success: false, message: "Failed to update file status" });
    }
};

module.exports = { uploadFile, deleteFile, updateFileStatus };
