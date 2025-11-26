const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get all orders (admin only)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('items.productId').populate('userId');
    
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const orders = await Order.find({ userId }).populate('items.productId');
    
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order from cart
const createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { shippingAddress } = req.body;
    
    // Get user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Calculate total price
    const totalPrice = cart.items.reduce((total, item) => 
      total + (item.quantity * item.price), 0
    );
    
    // Create order items
    const orderItems = cart.items.map(item => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.price
    }));
    
    // Create order
    const order = new Order({
      userId,
      items: orderItems,
      shippingAddress,
      totalPrice
    });
    
    const savedOrder = await order.save();
    
    // Clear cart after order creation
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    
    // Populate product details before sending response
    await savedOrder.populate('items.productId');
    
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const orderId = req.params.id;
    
    const order = await Order.findOne({ _id: orderId, userId }).populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status (admin only)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;
    
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getUserOrders,
  createOrderFromCart,
  getOrderById,
  updateOrderStatus
};