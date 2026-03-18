const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  offerPrice: {
    type: Number,
    min: 0,
  },
  startDate: { type: Date },
  endDate: { type: Date },
  isActive: { type: Boolean, default: true },
});

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  imageUrl: {
    type: String,
  },
  minOrderQty: {
    type: Number,
    default: 1,
    min: 1,
  },
  maxOrderQty: {
    type: Number,
    min: 1,
  },
  offers: [offerSchema],
  tags: {
    type: [String],
    index: true,
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add a text index for searching on name, description, and tags.
// This will make keyword searches on the mobile app more efficient.
productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
});

module.exports = mongoose.model('Product', productSchema);