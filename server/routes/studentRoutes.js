const express = require('express');
const { getAllFiles,toggleFileStatus,getStudent } = require('../controllers/studentController');
const router = express.Router();


router.get('/getAllFiles', getAllFiles);
router.put('/toggleFileStatus/:id', toggleFileStatus);
router.get('/getStudent', getStudent);

module.exports = router;