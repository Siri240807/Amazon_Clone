const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');

mongoose.connect('mongodb://localhost:27017/amazonclone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  mongoose.connection.close();
})
.catch(err => {
  console.log('MongoDB connection failed:', err.message);
  process.exit(1);
});