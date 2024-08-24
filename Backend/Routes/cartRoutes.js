const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add item to cart
router.post("/add", cartController.addItem);

// Remove item from cart
router.post("/remove", cartController.removeItem);

// Get cart details
router.get("/getCart", cartController.getCart);

module.exports = router;
