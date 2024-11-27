const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { sendResponse } = require('../utils/helper');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token

    if (!token) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, 'Access token is required.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid or expired token.');
    }
};

module.exports = authenticate;
