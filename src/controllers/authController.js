const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { sendResponse, sanitizeUser, hashPassword, generateToken, generateRefreshToken } = require('../utils/helper');
const jwt = require('jsonwebtoken');
const validator = require('validator');

let refreshTokens = [];

const signupController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Name, Email, and Password are required.');
    }

    if (!validator.isEmail(email)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email format.');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Email already in use.');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role: 'user',
    });

    const userData = sanitizeUser(newUser);

    return sendResponse(res, StatusCodes.CREATED, 'User registered successfully.', userData);
});

const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Email and Password are required.');
    }

    const user = await User.findOne({ email });
    if (!user) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email or password.');
    }

    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    refreshTokens.push(refreshToken);

    return sendResponse(res, StatusCodes.OK, 'User logged in successfully.', {
        user: sanitizeUser(user),
        accessToken,
        refreshToken,
    });
});

const refreshTokenController = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Refresh token is required.');
    }

    if (!refreshTokens.includes(refreshToken)) {
        return sendResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid refresh token.');
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return sendResponse(res, StatusCodes.UNAUTHORIZED, 'Invalid refresh token.');
        }

        const newAccessToken = generateToken({ id: user.id, email: user.email });
        return sendResponse(res, StatusCodes.OK, 'Access token refreshed successfully.', { accessToken: newAccessToken });
    });
});

module.exports = {
    signupController,
    loginController,
    refreshTokenController,
};
