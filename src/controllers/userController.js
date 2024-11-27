const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const { sendResponse, validateObjectId, indianPhoneRegex } = require('../utils/helper');
const validator = require('validator');

const getUserController = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ '_id': -1 }).select('-password');

    if (!users || users.length === 0) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'No users found.');
    }

    return sendResponse(res, StatusCodes.OK, 'Users fetched successfully.', users);
});

const getUserByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid user ID.');
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'User not found.');
    }

    return sendResponse(res, StatusCodes.OK, 'User fetched successfully.', user);
});

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

    if (phone && !indianPhoneRegex.test(phone)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid phone number format. Use +91 followed by 10 digits.');
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Email is already in use.');
    }

    const phoneExists = phone ? await User.findOne({ phone }) : null;
    if (phoneExists) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Phone number is already in use.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || 'user',
        phone
    });

    const responseData = await newUser.save();

    return responseData
        ? sendResponse(res, StatusCodes.CREATED, 'User created successfully.', responseData)
        : sendResponse(res, StatusCodes.FORBIDDEN, 'Error creating user.');
});

const updateUserController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role, phone } = req.body;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid user ID.');
    }

    const user = await User.findById(id);
    if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'User not found.');
    }

    if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'Email is already in use.');
        }
    }

    if (phone && phone !== user.phone && !indianPhoneRegex.test(phone)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid phone number format. Use +91 followed by 10 digits.');
    }

    if (phone && phone !== user.phone) {
        const phoneExists = await User.findOne({ phone });
        if (phoneExists) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'Phone number is already in use.');
        }
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    return sendResponse(res, StatusCodes.OK, 'User updated successfully.', updatedUser);
});

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

    if (updateData.phone && !indianPhoneRegex.test(updateData.phone)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid phone number format. Use +91 followed by 10 digits.');
    }

    const user = await User.findById(id);
    if (!user) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'User not found.');
    }

    if (updateData.password) {
        const hashedPassword = await bcrypt.hash(updateData.password, 10);
        updateData.password = hashedPassword;
    }

    Object.assign(user, updateData);

    const updatedUser = await user.save();

    return sendResponse(res, StatusCodes.OK, 'User partially updated.', updatedUser);
});

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
    getUserByIdController,
    createUserController,
    updateUserController,
    partialUpdateUserController,
    deleteUserController
};
