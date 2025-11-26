const mongoose = require('mongoose');
require('dotenv').config();

// Import Product model
const Product = require('./models/Product');

// Sample products data
const sampleProducts = [
  {
    name: "Vitamin C Supplement",
    description: "Boost your immune system with our premium Vitamin C supplement. 1000mg per serving.",
    price: 15.99,
    category: "Health",
    imageUrl: "images/health_personalcare.jpg",
    quantity: 50
  },
  {
    name: "Hand Sanitizer",
    description: "Kill 99.9% of germs with our alcohol-based hand sanitizer. 8oz bottle.",
    price: 4.99,
    category: "Health",
    imageUrl: "images/health_personalcare.jpg",
    quantity: 100
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt for everyday wear. Available in multiple colors.",
    price: 19.99,
    category: "Clothing",
    imageUrl: "images/Clothing & Fashion.png",
    quantity: 75
  },
  {
    name: "Blue Jeans",
    description: "Classic blue jeans with a perfect fit. Made from premium denim material.",
    price: 39.99,
    category: "Clothing",
    imageUrl: "images/Clothing & Fashion.png",
    quantity: 30
  },
  {
    name: "Crucial SSD 1TB",
    description: "High-performance 1TB SSD for faster computing and gaming experiences.",
    price: 79.99,
    category: "SSD_RAM",
    imageUrl: "images/Deals on crucial SSD & RAMs.jpg",
    quantity: 25
  },
  {
    name: "8GB DDR4 RAM",
    description: "Upgrade your system with our reliable 8GB DDR4 RAM module.",
    price: 29.99,
    category: "SSD_RAM",
    imageUrl: "images/Deals on crucial SSD & RAMs.jpg",
    quantity: 40
  }
];

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
    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');
    
    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ Inserted ${insertedProducts.length} sample products`);
    
    // Display inserted products
    console.log('\nInserted products:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.name} (${product.category}) - $${product.price}`);
    });
    
    mongoose.connection.close();
    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    mongoose.connection.close();
    process.exit(1);
  }
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});