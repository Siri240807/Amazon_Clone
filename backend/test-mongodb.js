const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amazonclone';

console.log('Testing MongoDB connection...');
console.log('Using URI:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully!');
  mongoose.connection.close();
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
  console.log('\nTroubleshooting steps:');
  console.log('1. Verify your username and password are correct');
  console.log('2. Check if your IP is whitelisted in MongoDB Atlas');
  console.log('3. Confirm the cluster name is correct');
  console.log('4. If password has special characters, they need URL encoding');
  process.exit(1);
});