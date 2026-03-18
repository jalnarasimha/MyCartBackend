const Product = require('../models/product');

/**
 * @description Get all products
 * @route GET /api/products
 * @access Public
 */
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category').populate('user', 'username');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @description Update a product
 * @route PUT /api/products/:id
 * @access Private
 */
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @description Get products by category ID
 * @route GET /api/products/category/:categoryId
 * @access Public
 */
exports.getProductByCategoryId = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryId })
      .populate('category')
      .populate('user', 'username');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @description Create a product
 * @route POST /api/products
 * @access Private (requires auth)
 */
exports.createProduct = async (req, res) => {
  try {
    // In a real app, you'd get the user from auth middleware
    // const user = req.user.id; 
    const {
      name,
      description,
      price,
      category,
      user, // for now, we pass it in the body
      stock,
      imageUrl,
      minOrderQty,
      maxOrderQty,
      tags,
      offers,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      user,
      stock,
      imageUrl,
      minOrderQty,
      maxOrderQty,
      tags,
      offers,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};