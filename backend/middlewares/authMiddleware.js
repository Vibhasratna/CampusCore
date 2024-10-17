// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../../../CampusSocial/backend/models/userModel');
const { JWT_SECRET } = require('../config/config');

// Middleware to authenticate and authorize users
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        return next();
    }


    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            // Custom response if user is not found
            return res.status(401).json({ message: 'User not found.', userExists: false });
        }
        // If user is found, attach the user to the request object
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};

module.exports = authenticateToken;