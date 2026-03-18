const express = require('express');
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, getProductByCategoryId } = require('../controllers/productController');

// const auth = require('../middleware/auth'); // You would have an auth middleware

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get('/', getAllProducts);

// @route   POST /api/products
// @desc    Create a product
// @access  Private (should be protected by auth middleware)
router.post('/', createProduct); //, auth, createProduct);

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Private
router.put('/:id', updateProduct);

// @route   GET /api/products/category/:categoryId
// @desc    Get products by category ID
// @access  Public
router.get('/category/:categoryId', getProductByCategoryId);

module.exports = router;