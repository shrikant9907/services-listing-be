const asyncHandler = require('express-async-handler');
const Location = require('../models/locationModel');
const { StatusCodes } = require('http-status-codes');

const getLocationController = asyncHandler(async (req, res) => {

    const locations = await Location.find(); // ALl Records 

    if (!locations) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Unable to fatch user information ', data: locations
        });
    }

    return res.status(StatusCodes.OK).json({ message: 'Location Fetched Successfully.', data: locations });
});

const createLocationController = asyncHandler(async (req, res) => {
    const { title } = req.body;

    // Original URL not found (Bad Request)
    if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Original URL is required', data: null
        });
    }

    const newLocation = new Location({
        title,
    })

    // Created
    const responseData = await newLocation.save(); // Save / Update
    if (responseData) {
        return res.status(StatusCodes.CREATED).json({ message: 'Location Create Successfully.', data: responseData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Something wrong.', data: responseData });
});

const updateLocationController = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    // Bad Request if Id not found in the URL
    if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Original URL is required', data: null
        });
    }

    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Find and Not found
    const findURL = await Location.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    const updateData = await Location.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Location Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update location.', data: null });
});

// Diffience unclear
const partialUpdateLocationController = asyncHandler(async (req, res) => {
    const { title } = req.body; ///  4 - 5 Put (Full) (Patch partial)
    const { id } = req.params;

    // Bad Request if Id not found in the URL
    if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Original URL is required', data: null
        });
    }

    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Find and Not found
    const findURL = await Location.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    const updateData = await Location.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Location Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update location.', data: null });
});

const deleteLocationController = asyncHandler(async (req, res) => {

    const { id } = req.params;
    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Invalid ID

    // Find and Not found
    const findURL = await Location.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Delete
    const deletedData = await Location.findByIdAndDelete({ _id: id });
    if (deletedData) {
        return res.status(200).json({ message: 'Location Deleted', data: deletedData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to delete location.', data: null });

});

module.exports = {
    getLocationController,
    createLocationController,
    updateLocationController,
    partialUpdateLocationController,
    deleteLocationController
}