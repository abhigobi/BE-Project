const { uploadStudentExcelFile ,uploadTeacherExcelFile, uploadWardenExcelFile} = require('../controllers/adminController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post('/upload/studentExcelFile',upload.single('file'), uploadStudentExcelFile);
router.post('/upload/teacherExcelFile',upload.single('file'), uploadTeacherExcelFile);
router.post('/upload/wardenExcelFile',upload.single('file'), uploadWardenExcelFile);

module.exports = router;