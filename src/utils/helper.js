const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Helper function to validate ObjectId
const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Helper function for common response
const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        message,
        data,
    });
};

// Helper function to generate a short string
const getShortString = (maxLimit = 11) => {
    return Math.random().toString(36).substring(3, maxLimit);
};

const indianPhoneRegex = /^\+91\d{10}$/; // Regex for Indian phone numbers (+91 followed by 10 digits)

const hashPassword = async (password) => bcrypt.hash(password, 10);

const generateToken = (user) =>
    jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

const generateRefreshToken = (user) =>
    jwt.sign({ id: user._id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

const sanitizeUser = (user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
});

module.exports = {
    getShortString,
    validateObjectId,
    sendResponse,
    indianPhoneRegex,
    hashPassword,
    generateToken,
    generateRefreshToken,
    sanitizeUser
}