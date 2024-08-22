const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User registration
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);

// User logout
router.post('/logout', authController.logout);

// Forgot password
router.post('/forgotPassword', authController.forgotPassword );

// Password reset
router.post('/resetPassword', authController.resetPassword);

module.exports = router;
