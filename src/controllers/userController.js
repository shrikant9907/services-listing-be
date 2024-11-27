const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { sendResponse, validateObjectId } = require('../utils/helper');
const validator = require('validator');

// Get all users
const getUserController = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ '_id': -1 });

    if (!users || users.length === 0) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'No users found.');
    }

    return sendResponse(res, StatusCodes.OK, 'Users fetched successfully.', users);
});

// Create a new user
const createUserController = asyncHandler(async (req, res) => {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Name, Email, and Password are required.');
    }

    if (!validator.isEmail(email)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email format.');
    }

    if (password.length < 6) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Password must be at least 6 characters long.');
    }

    if (phone && !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid phone number format.');
    }

    const newUser = new User({
        name,
        email,
        password,
        role: role || 'user',
        phone
    });

    const responseData = await newUser.save();

    return responseData
        ? sendResponse(res, StatusCodes.CREATED, 'User created successfully.', responseData)
        : sendResponse(res, StatusCodes.FORBIDDEN, 'Error creating user.');
});

// Update a user
const updateUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, phone } = req.body;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid user ID.');
    }

    if (email && !validator.isEmail(email)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email format.');
    }

    if (password && password.length < 6) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Password must be at least 6 characters long.');
    }

    if (phone && !validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid phone number format.');
    }

    const user = await User.findById(id);
    if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'User not found.');
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    return sendResponse(res, StatusCodes.OK, 'User updated successfully.', updatedUser);
});

// Partially update a user
const partialUpdateUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid user ID.');
    }

    if (updateData.email && !validator.isEmail(updateData.email)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid email format.');
    }

    if (updateData.password && updateData.password.length < 6) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Password must be at least 6 characters long.');
    }

    if (updateData.phone && !validator.isMobilePhone(updateData.phone, 'any', { strictMode: false })) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid phone number format.');
    }

    const user = await User.findById(id);
    if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'User not found.');
    }

    Object.assign(user, updateData);

    const updatedUser = await user.save();

    return sendResponse(res, StatusCodes.OK, 'User partially updated.', updatedUser);
});

// Delete a user
const deleteUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid user ID.');
    }

    const user = await User.findById(id);
    if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'User not found.');
    }

    const deletedUser = await User.findByIdAndDelete(id);

    return sendResponse(res, StatusCodes.OK, 'User deleted successfully.', deletedUser);
});

module.exports = {
    getUserController,
    createUserController,
    updateUserController,
    partialUpdateUserController,
    deleteUserController
};
