const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', orderController.createOrder);

// @route   GET /api/orders/user/:userId
// @desc    Get orders by user
// @access  Private
router.get('/user/:userId', orderController.getOrdersByUser);

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Private
router.get('/:id', orderController.getOrderById);

// @route   PUT /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.put('/:id/status', orderController.updateOrderStatus);

module.exports = router;