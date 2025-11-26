const express = require('express');
const router = express.Router();
const {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getDefaultAddress
} = require('../controllers/addressController');

// Middleware to authenticate user
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

// GET /api/addresses - Get user's addresses
router.get('/', getUserAddresses);

// POST /api/addresses - Create a new address
router.post('/', createAddress);

// GET /api/addresses/default - Get default address
router.get('/default', getDefaultAddress);

// PUT /api/addresses/:id - Update an address
router.put('/:id', updateAddress);

// DELETE /api/addresses/:id - Delete an address
router.delete('/:id', deleteAddress);

module.exports = router;