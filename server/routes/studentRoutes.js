const express = require('express');
const { getAllFiles,toggleFileStatus } = require('../controllers/studentController');
const router = express.Router();


router.get('/getAllFiles', getAllFiles);
router.put('/toggleFileStatus/:id', toggleFileStatus);

module.exports = router;