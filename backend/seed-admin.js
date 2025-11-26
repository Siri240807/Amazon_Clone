const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const User = require('./models/User');

// Admin user data
const adminUser = {
  username: "admin",
  email: "admin@example.com",
  password: "admin123", // In a real app, this should be hashed
  firstName: "Admin",
  lastName: "User",
  role: "admin"
};

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amazonclone';

console.log('Connecting to MongoDB...');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('✅ MongoDB connected successfully!');
  
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: adminUser.email });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:');
      console.log(`- Name: ${existingAdmin.firstName} ${existingAdmin.lastName}`);
      console.log(`- Email: ${existingAdmin.email}`);
      console.log(`- Role: ${existingAdmin.role}`);
    } else {
      // Create admin user
      const newAdmin = new User(adminUser);
      await newAdmin.save();
      console.log('✅ Admin user created successfully!');
      console.log(`- Name: ${newAdmin.firstName} ${newAdmin.lastName}`);
      console.log(`- Email: ${newAdmin.email}`);
      console.log(`- Role: ${newAdmin.role}`);
    }
    
    mongoose.connection.close();
    console.log('\n🎉 Admin user setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up admin user:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});