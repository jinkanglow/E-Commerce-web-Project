const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Add item to cart
router.post('/add', cartController.addItem);

// Remove item from cart
router.post('/remove', cartController.removeItem);

// Get cart details
router.get('/details', cartController.getCartDetails);

// Update cart item quantity
router.post('/update', cartController.updateItemQuantity);

module.exports = router;
