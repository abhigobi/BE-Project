const { uploadExcelFile } = require('../controllers/adminController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
router.post('/upload/studentExcelFile',upload.single('file'), uploadExcelFile);

module.exports = router;