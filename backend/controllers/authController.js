// authController.js
const jwt = require('jsonwebtoken');
const User = require('../../../CampusSocial/backend/models/userModel');
const { generateToken } = require('../../../CampusSocial/backend/utils/jwtUtils');
const { hashPassword, comparePassword } = require('../../../CampusSocial/backend/utils/hashUtils');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ message: 'User already exists.' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);
        console.log('Hashed Password during Registration:', hashedPassword);

        // Save the user with the hashed password
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Immediately retrieve and log the stored password from the database
        const savedUser = await User.findOne({ email: newUser.email });
        const token = generateToken(savedUser._id);
        console.log('Stored Hashed Password after Save:', savedUser.password);

        res.status(201).json({ message: 'User registered successfully.',
            email: savedUser.email,
            token
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user.', error });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Log the stored hashed password for debugging
        console.log('Stored Hashed Password:', user.password);

        // Compare the provided password with the stored hashed password
        const isMatch = await comparePassword(password, user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate and return the JWT token
        const token = generateToken(user._id);
        res.status(200).json({
            email: user.email,
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in.', error });
    }
};
//Logout user (invalidate the token)
exports.logout = (req, res) => {
    // Invalidate the token on the client side (e.g., remove it from local storage)
    res.status(200).json({ message: 'Logged out successfully.' });
};