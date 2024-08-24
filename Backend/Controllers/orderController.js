const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const order = new Order({
      userId,
      items: cart.items,
      shippingAddress,
      paymentMethod,
      totalAmount: cart.items.reduce(
        (total, item) => total + item.productId.price * item.quantity,
        0
      ),
      status: "pending",
    });

    await order.save();
    // Clear cart after order is placed
    await Cart.deleteOne({ userId });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate order ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid order ID format" });
    }

    const order = await Order.findById(id)
      .populate("items.productId")
      .populate("userId");
    if (!order) return res.status(404).json({ error: "Order not found" });

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate order ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid order ID format" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Error updating order status" });
  }
};

// List all orders for a user
exports.listUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate user ID
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const orders = await Order.find({ userId }).populate("items.productId");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching orders" });
  }
};

// Cancel an order
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate order ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid order ID format" });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = "canceled";
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ error: "Error canceling order" });
  }
};
