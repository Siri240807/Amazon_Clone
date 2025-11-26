const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

// Get user's wishlist
const getWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    let wishlist = await Wishlist.findOne({ userId }).populate('items.productId');
    
    if (!wishlist) {
      // Create a new empty wishlist if it doesn't exist
      wishlist = new Wishlist({
        userId,
        items: []
      });
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add item to wishlist
const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        items: []
      });
    }
    
    // Check if product is already in wishlist
    const existingItem = wishlist.items.find(item => item.productId.toString() === productId);
    
    if (existingItem) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }
    
    // Add product to wishlist
    wishlist.items.push({ productId });
    
    const savedWishlist = await wishlist.save();
    
    // Populate the product details
    await savedWishlist.populate('items.productId');
    
    res.status(201).json(savedWishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.body;
    
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    // Remove product from wishlist
    wishlist.items = wishlist.items.filter(item => item.productId.toString() !== productId);
    
    const savedWishlist = await wishlist.save();
    
    res.json(savedWishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Check if product is in wishlist
const isProductInWishlist = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ userId });
    
    if (!wishlist) {
      return res.json({ inWishlist: false });
    }
    
    const inWishlist = wishlist.items.some(item => item.productId.toString() === productId);
    
    res.json({ inWishlist });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist
};