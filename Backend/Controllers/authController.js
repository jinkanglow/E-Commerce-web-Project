const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegistration, validateLogin } = require('../utils/validators');

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
exports.logout = (req, res) => {
    // Implement logout logic if needed (e.g., token invalidation)
    res.status(200).json({ message: 'Logged out successfully' });
};

// Forgot password (initiate reset)
exports.forgotPassword = async (req, res) => {
    // Implement password reset logic (e.g., send reset link via email)
};

// Reset password (after user clicks reset link)
exports.resetPassword = async (req, res) => {
    // Implement password reset logic
};
