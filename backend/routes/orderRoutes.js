const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getUserOrders,
  createOrderFromCart,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');

// Middleware to authenticate user
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Apply auth middleware to all routes
router.use(auth);

// GET /api/orders - Get user's orders
router.get('/', getUserOrders);

// POST /api/orders - Create a new order from cart
router.post('/', createOrderFromCart);

// GET /api/orders/:id - Get order by ID
router.get('/:id', getOrderById);

// GET /api/orders/all - Get all orders (admin only)
router.get('/all', admin, getAllOrders);

// PUT /api/orders/:id/status - Update order status (admin only)
router.put('/:id/status', admin, updateOrderStatus);

module.exports = router;