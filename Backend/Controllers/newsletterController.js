const Newsletter = require('../models/Newsletter');

// Subscribe to newsletter
exports.subscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const existingSubscription = await Newsletter.findOne({ email });

        if (existingSubscription) {
            return res.status(400).json({ error: 'Email already subscribed' });
        }

        const newSubscription = new Newsletter({ email });
        await newSubscription.save();
        res.status(200).json({ message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Error subscribing to newsletter:', error);
        res.status(500).json({ error: 'Error subscribing to newsletter' });
    }
};

// Unsubscribe from newsletter
exports.unsubscribe = async (req, res) => {
    try {
        const { email } = req.body;
        const subscription = await Newsletter.findOneAndDelete({ email });

        if (!subscription) {
            return res.status(404).json({ error: 'Email not found in subscription list' });
        }

        res.status(200).json({ message: 'Unsubscribed successfully' });
    } catch (error) {
        console.error('Error unsubscribing from newsletter:', error);
        res.status(500).json({ error: 'Error unsubscribing from newsletter' });
    }
};

// Get all subscribers (admin only)
exports.getSubscribers = async (req, res) => {
    try {
        const subscribers = await Newsletter.find();
        res.status(200).json(subscribers);
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ error: 'Error fetching subscribers' });
    }
};
