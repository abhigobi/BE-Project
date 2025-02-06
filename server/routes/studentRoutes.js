const express = require('express');
const { getAllFiles } = require('../controllers/studentController');
const router = express.Router();

// Student login route
router.get('/getAllFiles', getAllFiles);
module.exports = router;