const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/NotificationController");

// Get notifications for a user
router.get("/user/:userId", notificationController.getNotifications);

// Mark notification as read
router.put("/:id/mark-read", notificationController.markAsRead);

// Delete notification
router.delete("/:id", notificationController.deleteNotification);

module.exports = router;
