const express = require('express');
const app = express();
const errorMiddleware = require('./middleware/errors');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const productRoutes = require('./routes/product');

// Body parser
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/products', productRoutes);

// Middleware for error handling
app.use(errorMiddleware);

module.exports = app;
