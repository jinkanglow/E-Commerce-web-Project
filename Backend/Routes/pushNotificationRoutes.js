const express = require('express');
const router = express.Router();
const pushNotificationController = require('../controllers/PushNotificationController');

// Send a push notification
router.post('/send', pushNotificationController.sendPushNotification);

// Get push notification details
router.get('/:notificationId', pushNotificationController.getPushNotificationDetails);

module.exports = router;
