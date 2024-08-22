const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/NotificationController');

// Get notifications for a user
router.get('/user/:userId', notificationController.getNotifications);

// Mark notification as read
router.post('/mark-read', notificationController.markAsRead);

module.exports = router;
