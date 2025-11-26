const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  isProductInWishlist
} = require('../controllers/wishlistController');

// Middleware to authenticate user
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// GET /api/wishlist - Get user's wishlist
router.get('/', getWishlist);

// POST /api/wishlist/add - Add item to wishlist
router.post('/add', addToWishlist);

// DELETE /api/wishlist/remove - Remove item from wishlist
router.delete('/remove', removeFromWishlist);

// GET /api/wishlist/check/:productId - Check if product is in wishlist
router.get('/check/:productId', isProductInWishlist);

module.exports = router;