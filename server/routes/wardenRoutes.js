const express = require('express');
const upload = require('../middleware/upload');
const { uploadFile,deleteFile,updateFileStatus } = require('../controllers/wardenController');

const router = express.Router();

router.post('/upload/pdf', upload.single('file'), uploadFile);

router.delete('/delete/pdf/:id', deleteFile);
router.put('/files/:id/update-status', updateFileStatus);

module.exports = router;
