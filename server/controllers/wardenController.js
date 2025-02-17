const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');
const CommonCompliancePdfForStudent = require('../models/CommonCompliancePdfForStudent');
const StudentComplianceStatus = require('../models/StudentComplianceStatus');
const Student = require('../models/Student');
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
        const { compliance_id } = req.params;
        if (!compliance_id) {
            return res.status(400).json({ error: "File ID is required" });
        }

        // Fetch file from DB
        const [files] = await CommonCompliancePdfForStudent.getFileById(compliance_id);
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
        const cloudinaryResponse = await cloudinary.uploader.destroy(publicId, { 
            resource_type: "raw", 
            type: "upload" 
        });

        if (cloudinaryResponse.result !== "ok") {
            return res.status(500).json({ error: "Cloudinary deletion failed" });
        }

        try {
            // Delete records in sequence to maintain referential integrity
            // First delete from StudentComplianceStatus
            await StudentComplianceStatus.deleteByComplianceId(compliance_id);
            
            // Then delete from CommonCompliancePdfForStudent
            await CommonCompliancePdfForStudent.deleteFile(compliance_id);

            res.status(200).json({ 
                success: true, 
                message: "File and associated compliance statuses deleted successfully" 
            });
        } catch (dbError) {
            console.error("Database deletion error:", dbError);
            // Since Cloudinary deletion succeeded but database deletion failed,
            // we should inform the user of the partial success
            res.status(500).json({ 
                error: "File deleted from storage but database cleanup failed",
                details: dbError.message 
            });
        }

    } catch (error) {
        console.error("Error in deletion process:", error);
        res.status(500).json({ 
            error: "Failed to delete file and associated compliance statuses",
            details: error.message 
        });
    }
};

const updateFileStatus = async (req, res) => {
    // const { studentId } = req.params;
    const { status, studentId, compliance_id } = req.body;
    console.log(studentId, status);
    // Validate the status
    const allowedStatuses = ['Pending', 'Completed', 'Waiting For Approve', 'Rejected'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status provided" });
    }

    try {
        // Fetch the file to ensure it exists
        const [file] = await StudentComplianceStatus.getStudentComplianceStatusID(studentId, compliance_id);

        if (file.length === 0) {
            return res.status(404).json({ success: false, message: "File not found" });
        }

        // Update the status in the database
        await StudentComplianceStatus.updateStudentComplianceStatus(studentId, compliance_id, status);

        res.status(200).json({ success: true, message: "Status updated successfully", newStatus: status });
    } catch (error) {
        console.error("Error updating file status:", error);
        res.status(500).json({ success: false, message: "Failed to update file status" });
    }
};

const createCompliance = async (req, res) => {
    try {
        // Extract data from request body
        const { complianceId, due_date } = req.body;

        // Validate input
        if (!complianceId || !due_date) {
            return res.status(400).json({ 
                error: 'Both complianceId and due_date are required' 
            });
        }

        // Validate date format (DD-MM-YYYY)
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
        if (!dateRegex.test(due_date)) {
            return res.status(400).json({ 
                error: 'Invalid date format. Please use DD-MM-YYYY format (e.g., 03-03-2025)' 
            });
        }

        // Convert date from DD-MM-YYYY to YYYY-MM-DD for database
        const [day, month, year] = due_date.split('-');
        const formattedDate = `${year}-${month}-${day}`;

        // Fetch name and URL for the compliance
        const data = await CommonCompliancePdfForStudent.getNameAndUrl(complianceId);
        if (!data?.[0]?.[0]) {
            return res.status(404).json({ 
                error: `Compliance with ID ${complianceId} not found` 
            });
        }
        const { name, url } = data[0][0];

        // Fetch all student IDs
        const studentIds = await Student.getAllStudentIds();
        if (!studentIds?.length) {
            return res.status(404).json({ 
                error: 'No students found in the system' 
            });
        }

        // Initialize status for all students
        await StudentComplianceStatus.initializeStatusForAllStudents(
            complianceId,
            studentIds,
            url,
            name,
            formattedDate
        );

        return res.status(201).json({ 
            success: true, 
            complianceId: complianceId 
        });
    } catch (error) {
        console.error("Error in createCompliance:", error);
        return res.status(500).json({ 
            error: 'Failed to create compliance',
            details: error.message 
        });
    }
};

const getAllStudentCompliances = async (req, res) => {
    try {
        const students = await StudentComplianceStatus.getAllStudentCompliances();
        res.status(200).json({ 
            success: true, 
            students,
            total_students: students.length,
            total_compliances: students.reduce((sum, student) => 
                sum + student.compliances.length, 0
            )
        });
    } catch (error) {
        console.error("Error fetching student compliances:", error);
        res.status(500).json({ error: "Failed to fetch student compliances" });
    }
}
module.exports = { uploadFile, deleteFile, updateFileStatus, createCompliance, getAllStudentCompliances };
