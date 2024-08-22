const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Place a new order
router.post('/place', orderController.placeOrder);

// Get order details
router.get('/:orderId', orderController.getOrderDetails);

// Cancel an order
router.post('/cancel', orderController.cancelOrder);

// List all orders for a user
router.get('/user/:userId', orderController.listUserOrders);

module.exports = router;
