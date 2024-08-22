const PushNotification = require('../models/PushNotification');

// Send a push notification
exports.sendNotification = async (req, res) => {
    try {
        const { title, message, userId } = req.body;
        
        // Implement the logic to send push notifications
        // Example: using a service like Firebase Cloud Messaging (FCM)

        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Error sending notification' });
    }
};

// Get all notifications for a user
exports.getNotificationsForUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await PushNotification.find({ userId });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Error fetching notifications' });
    }
};
