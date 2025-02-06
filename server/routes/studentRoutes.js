const express = require('express');
const { loginStudent } = require('../controllers/studentController');
const router = express.Router();

// Student login route
router.post('/login', loginStudent);

module.exports = router;