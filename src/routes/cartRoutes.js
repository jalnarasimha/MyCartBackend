const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// @route   GET /api/cart/:userId
// @desc    Get user cart
// @access  Private
router.get('/:userId', cartController.getCart);

// @route   POST /api/cart
// @desc    Add item to cart or create cart
// @access  Private
router.post('/', cartController.addToCart);

// @route   DELETE /api/cart/:userId/item/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/:userId/item/:productId', cartController.removeFromCart);

// @route   PUT /api/cart/update
// @desc    Update item quantity
// @access  Private
router.put('/update', cartController.updateCartItem);

module.exports = router;