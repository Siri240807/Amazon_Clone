const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amazonclone';

console.log('Attempting to connect to MongoDB...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  console.log(`Connected to: ${MONGODB_URI}`);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.log('\n=== TROUBLESHOOTING STEPS ===');
  console.log('1. Double-check your username and password in MongoDB Atlas');
  console.log('2. Verify your IP address is whitelisted in MongoDB Atlas Network Access');
  console.log('3. Confirm the cluster name in your connection string is correct');
  console.log('4. Try creating a new database user with a simple password');
  console.log('5. If using special characters in password, they must be URL encoded');
  console.log('');
  console.log('Current connection string:');
  console.log(MONGODB_URI);
  console.log('');
  console.log('For testing, you can temporarily:');
  console.log('- Add your current IP to the whitelist in MongoDB Atlas');
  console.log('- Or add 0.0.0.0/0 to allow connections from anywhere (less secure)');
});

// Routes
app.get('/', (req, res) => {
  res.send('Amazon Clone API is running...');
});

// API Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const addressRoutes = require('./routes/addressRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🔗 API endpoints available at http://localhost:${PORT}/api`);
});