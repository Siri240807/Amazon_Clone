const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

// Middleware to authenticate user
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// GET /api/cart - Get user's cart
router.get('/', getCart);

// POST /api/cart/add - Add item to cart
router.post('/add', addToCart);

// PUT /api/cart/update - Update item quantity in cart
router.put('/update', updateCartItem);

// DELETE /api/cart/remove - Remove item from cart
router.delete('/remove', removeFromCart);

// DELETE /api/cart/clear - Clear cart
router.delete('/clear', clearCart);

module.exports = router;