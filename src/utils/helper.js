const mongoose = require('mongoose');

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

module.exports = {
    getShortString,
    validateObjectId,
    sendResponse
}