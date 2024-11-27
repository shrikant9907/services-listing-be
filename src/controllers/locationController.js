const asyncHandler = require('express-async-handler');
const Location = require('../models/locationModel');
const { StatusCodes } = require('http-status-codes');
const { validateObjectId, sendResponse } = require('../utils/helper');
const validator = require('validator');

const getLocationController = asyncHandler(async (req, res) => {
    const locations = await Location.find();

    if (!locations || locations.length === 0) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'No locations found');
    }

    return sendResponse(res, StatusCodes.OK, 'Locations fetched successfully', locations);
});

const createLocationController = asyncHandler(async (req, res) => {
    const { title, address, city, state, country, postalCode } = req.body;

    if (!title || !validator.isLength(title, { min: 3, max: 100 })) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Title is required and should be between 3 and 100 characters');
    }

    const existingLocation = await Location.findOne({ title });
    if (existingLocation) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'A location with this title already exists');
    }

    const newLocation = new Location({
        title,
        address,
        city,
        state,
        country,
        postalCode,
    });

    const savedLocation = await newLocation.save();

    if (savedLocation) {
        return sendResponse(res, StatusCodes.CREATED, 'Location created successfully', savedLocation);
    }

    return sendResponse(res, StatusCodes.FORBIDDEN, 'Error creating location');
});

const updateLocationController = asyncHandler(async (req, res) => {
    const { title, address, city, state, country, postalCode } = req.body;
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Location ID');
    }

    if (title) {
        const existingLocation = await Location.findOne({ title });
        if (existingLocation && existingLocation._id.toString() !== id) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'A location with this title already exists');
        }
    }

    const updatedLocation = await Location.findByIdAndUpdate(id, {
        title,
        address,
        city,
        state,
        country,
        postalCode,
    }, { new: true });

    if (!updatedLocation) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Location not found');
    }

    return sendResponse(res, StatusCodes.OK, 'Location updated successfully', updatedLocation);
});

const partialUpdateLocationController = asyncHandler(async (req, res) => {
    const updateData = req.body;
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Location ID');
    }

    if (updateData.title) {
        const existingLocation = await Location.findOne({ title: updateData.title });
        if (existingLocation && existingLocation._id.toString() !== id) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'A location with this title already exists');
        }
    }

    const updatedLocation = await Location.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedLocation) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Location not found');
    }

    return sendResponse(res, StatusCodes.OK, 'Location partially updated', updatedLocation);
});

const deleteLocationController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Location ID');
    }

    const deletedLocation = await Location.findByIdAndDelete(id);

    if (!deletedLocation) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Location not found');
    }

    return sendResponse(res, StatusCodes.OK, 'Location deleted successfully', deletedLocation);
});

module.exports = {
    getLocationController,
    createLocationController,
    updateLocationController,
    partialUpdateLocationController,
    deleteLocationController,
};
