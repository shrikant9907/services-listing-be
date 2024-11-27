const asyncHandler = require('express-async-handler');
const Business = require('../models/businessModel');
const { StatusCodes } = require('http-status-codes');
const { validateObjectId, sendResponse } = require('../utils/helper');

const getBusinessController = asyncHandler(async (req, res) => {
    const businesses = await Business.find()
        .populate('category')
        .populate('location');

    if (!businesses || businesses.length === 0) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'No businesses found');
    }

    return sendResponse(res, StatusCodes.OK, 'Businesses fetched successfully', businesses);
});

const getBusinessByIdController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Business ID');
    }

    const business = await Business.findById(id)
        .populate('category')
        .populate('location');

    if (!business) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Business not found');
    }

    return sendResponse(res, StatusCodes.OK, 'Business fetched successfully', business);
});

const createBusinessController = asyncHandler(async (req, res) => {
    const { title, category, location, contact, description, owner } = req.body;

    if (!validateObjectId(category)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Category ID');
    }

    if (location && !validateObjectId(location)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Location ID');
    }

    if (!title || !category || !location || !contact || !owner) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Title, Category, Location, Contact, and Owner are required');
    }

    const newBusiness = new Business({
        title,
        category,
        location,
        contact,
        description,
        owner
    });

    const responseData = await newBusiness.save();

    if (responseData) {
        return sendResponse(res, StatusCodes.CREATED, 'Business created successfully', responseData);
    }

    return sendResponse(res, StatusCodes.FORBIDDEN, 'Error creating business');
});

const updateBusinessController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, category, location, contact, description, owner } = req.body;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Business ID');
    }

    const business = await Business.findById(id);
    if (!business) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Business not found');
    }

    business.title = title || business.title;
    business.category = category || business.category;
    business.location = location || business.location;
    business.contact = contact || business.contact;
    business.description = description || business.description;
    business.owner = owner || business.owner;

    const updatedBusiness = await business.save();

    return sendResponse(res, StatusCodes.OK, 'Business updated successfully', updatedBusiness);
});

const partialUpdateBusinessController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Business ID');
    }

    const business = await Business.findById(id);
    if (!business) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Business not found');
    }

    Object.assign(business, updateData);

    const updatedBusiness = await business.save();

    return sendResponse(res, StatusCodes.OK, 'Business partially updated', updatedBusiness);
});

const deleteBusinessController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Business ID');
    }

    const business = await Business.findById(id);
    if (!business) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Business not found');
    }

    const deletedBusiness = await Business.findByIdAndDelete(id);

    return sendResponse(res, StatusCodes.OK, 'Business deleted successfully', deletedBusiness);
});

module.exports = {
    getBusinessController,
    getBusinessByIdController,
    createBusinessController,
    updateBusinessController,
    partialUpdateBusinessController,
    deleteBusinessController
};
