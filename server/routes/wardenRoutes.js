const express = require('express');
const upload = require('../middleware/upload');
const { uploadFile,deleteFile } = require('../controllers/wardenController');

const router = express.Router();

router.post('/upload/pdf', upload.single('file'), uploadFile);

router.delete('/delete/pdf/:id', deleteFile);
module.exports = router;
