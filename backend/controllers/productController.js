const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: new RegExp(category, 'i') });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, quantity } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      category,
      imageUrl,
      quantity
    });
    
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, quantity, inStock } = req.body;
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, category, imageUrl, quantity, inStock },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    // Split query into words for better matching
    const searchTerms = query.trim().split(/\s+/);
    
    // Create regex patterns for each term
    const regexPatterns = searchTerms.map(term => new RegExp(term, 'i'));
    
    // Build search conditions
    const searchConditions = regexPatterns.map(pattern => ({
      $or: [
        { name: pattern },
        { description: pattern },
        { category: pattern }
      ]
    }));
    
    // Search for products matching ALL terms (AND logic) or ANY terms (OR logic)
    // Using AND logic for more precise results like Amazon
    const products = await Product.find({
      $and: searchConditions
    }).limit(50); // Limit results like Amazon does
    
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
};