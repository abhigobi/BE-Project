const uploadExcelFile = require('../utils/uploadExcelFile');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Warden = require('../models/Warden');

// Create specific controllers using the reusable function
const uploadStudentExcelFile = uploadExcelFile(Student);
const uploadTeacherExcelFile = uploadExcelFile(Teacher);
const uploadWardenExcelFile = uploadExcelFile(Warden);

module.exports = { uploadStudentExcelFile, uploadTeacherExcelFile, uploadWardenExcelFile };