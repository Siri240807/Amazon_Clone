const Address = require('../models/Address');

// Get user's addresses
const getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const addresses = await Address.find({ userId });
    
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new address
const createAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, street, city, state, zipCode, country, isDefault } = req.body;
    
    // If this is a default address, unset default on other addresses
    if (isDefault) {
      await Address.updateMany({ userId }, { isDefault: false });
    }
    
    const address = new Address({
      userId,
      name,
      street,
      city,
      state,
      zipCode,
      country,
      isDefault
    });
    
    const savedAddress = await address.save();
    
    res.status(201).json(savedAddress);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an address
const updateAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;
    const { name, street, city, state, zipCode, country, isDefault } = req.body;
    
    // If this is a default address, unset default on other addresses
    if (isDefault) {
      await Address.updateMany({ userId, _id: { $ne: addressId } }, { isDefault: false });
    }
    
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { name, street, city, state, zipCode, country, isDefault },
      { new: true }
    );
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    res.json(address);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const addressId = req.params.id;
    
    const address = await Address.findOneAndDelete({ _id: addressId, userId });
    
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    
    res.json({ message: 'Address deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get default address
const getDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const address = await Address.findOne({ userId, isDefault: true });
    
    if (!address) {
      return res.status(404).json({ message: 'No default address found' });
    }
    
    res.json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getDefaultAddress
};