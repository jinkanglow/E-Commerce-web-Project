const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Place a new order
router.post("/place", orderController.createOrder);

// Get order details
router.get("/:id", orderController.getOrderById);

// Update order status
router.patch("/:id/status", orderController.updateOrderStatus);

// Cancel an order
router.patch("/:id/cancel", orderController.cancelOrder);

// List all orders for a user
router.get("/user/:userId", orderController.listUserOrders);

module.exports = router;
