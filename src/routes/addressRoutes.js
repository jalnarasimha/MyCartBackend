const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// @route   POST /api/addresses
// @desc    Create a new address
// @access  Private
router.post('/', addressController.createAddress);

// @route   GET /api/addresses/user/:userId
// @desc    Get all addresses for a user
// @access  Private
router.get('/user/:userId', addressController.getAddressesByUser);

// @route   GET /api/addresses/:id
// @desc    Get address by ID
// @access  Private
router.get('/:id', addressController.getAddressById);

// @route   PUT /api/addresses/:id
// @desc    Update an address
// @access  Private
router.put('/:id', addressController.updateAddress);

// @route   DELETE /api/addresses/:id
// @desc    Delete an address
// @access  Private
router.delete('/:id', addressController.deleteAddress);

module.exports = router;