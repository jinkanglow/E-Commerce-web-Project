const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegistration, validateLogin } = require('../utils/validators');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const { error } = validateRegistration(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Registration error' });
    }
};

// Log in a user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = validateLogin(req.body);

        if (error) return res.status(400).json({ error: error.details[0].message });

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Login error' });
    }
};

// Log out a user (invalidate token)
exports.logout = async (req, res) => {
    try {
        // Invalidate token logic (e.g., by adding it to a blacklist)
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Logout error' });
    }
};

// Forgot password (initiate reset)
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        // Store resetToken in the user document and set expiration time
        // Send reset link via email
        const transporter = nodemailer.createTransport(/* Your email configuration */);
        const resetLink = `http://yourdomain.com/reset-password/${resetToken}`;

        await transporter.sendMail({
            to: user.email,
            subject: 'Password Reset',
            html: `Click <a href="${resetLink}">here</a> to reset your password.`
        });

        res.status(200).json({ message: 'Reset link sent to email' });
    } catch (error) {
        console.error('Error initiating password reset:', error);
        res.status(500).json({ error: 'Forgot password error' });
    }
};

// Reset password (after user clicks reset link)
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        // Find the user by resetToken and check expiration
        const user = await User.findOne({ resetToken });
        if (!user) {
            return res.status(404).json({ error: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = undefined; // Clear the reset token
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Reset password error' });
    }
};