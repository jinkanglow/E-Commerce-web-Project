const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { userId, shippingAddress, paymentMethod } = req.body;

        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        const order = new Order({
            userId,
            items: cart.items,
            shippingAddress,
            paymentMethod,
            totalAmount: cart.items.reduce((total, item) => total + (item.productId.price * item.quantity), 0),
            status: 'pending'
        });

        await order.save();
        // Clear cart after order is placed
        await Cart.deleteOne({ userId });

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Error creating order' });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id).populate('items.productId').populate('userId');
        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ error: 'Error fetching order' });
    }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);
        if (!order) return res.status(404).json({ error: 'Order not found' });

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Error updating order status' });
    }
};
