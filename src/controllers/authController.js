const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User = require('../models/userModel');
const { sendResponse } = require('../utils/helper');
const validator = require('validator');

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

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: 'user'
    });

    const responseData = await newUser.save();
    const userData = {
        "_id": responseData._id,
        "name": responseData.name,
        "email": responseData.email,
        "role": responseData.role,
    }

    return sendResponse(res, StatusCodes.CREATED, 'User registered successfully.', userData);
});

const loginController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Email and Password are required.');
    }

    const user = await User.findOne({ email });
    // const user = await User.findOne({ email }).select('_id name email role password');
    if (!user) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email or password.');
    }

    user.password = undefined;

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
    );

    return sendResponse(res, StatusCodes.OK, 'User logged in successfully.', {
        user: user,
        token: token
    });
});

module.exports = {
    signupController,
    loginController
};
