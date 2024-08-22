// middleware/authorizationMiddleware.js
const authorize = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

module.exports = authorize;
