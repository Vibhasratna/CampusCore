// hashUtils.js
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

// Hash a password
const hashPassword = async (password) => {
    try {
        return await bcrypt.hash(password, SALT_ROUNDS);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw new Error('Failed to hash password');
    }
};

// Compare a password with a hashed password
const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw new Error('Failed to compare password');
    }
};

module.exports = { hashPassword, comparePassword };