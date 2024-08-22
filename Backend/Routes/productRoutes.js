const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get product details
router.get('/:productId', productController.getProductDetails);

// Create a new product
router.post('/create', productController.createProduct);

// Update product details
router.post('/update', productController.updateProduct);

// Delete a product
router.post('/delete', productController.deleteProduct);

module.exports = router;
