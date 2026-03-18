const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST /api/admin/login
// @desc    Login for admin users
// @access  Public
router.post('/login', userController.loginAdmin);

module.exports = router;