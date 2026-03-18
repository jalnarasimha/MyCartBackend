const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// @route   POST /api/stores/login
// @desc    Login for store users
// @access  Public
router.post('/login', userController.loginStore);

module.exports = router;