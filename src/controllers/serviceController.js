const asyncHandler = require('express-async-handler');
const ShortURL = require('../models/serviceModel');
const { StatusCodes } = require('http-status-codes');
const { getShortString } = require('../utils/helper');

const getShortURlController = asyncHandler(async (req, res) => {

    // const shortURLs = await ShortURL.find({ originalUrl: "test" });
    const shortURLs = await ShortURL.find(); // ALl Records 

    if (!shortURLs) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Unable to fatch user information ', data: shortURLs
        });
    }

    return res.status(StatusCodes.OK).json({ message: 'Short URL Fetched Successfully.', data: shortURLs });
});

const createShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    // Original URL not found (Bad Request)
    if (!originalUrl) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Original URL is required', data: null
        });
    }

    const serviceString = getShortString(9);
    const newShortUrl = new ShortURL({
        originalUrl,
        service: process.env.SITE_URL + "/" + serviceString
    })

    // Created
    const responseData = await newShortUrl.save(); // Save / Update
    if (responseData) {
        return res.status(StatusCodes.CREATED).json({ message: 'Short URL Create Successfully.', data: responseData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Something wrong.', data: responseData });
});

const updateShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;
    const { id } = req.params;

    // Bad Request if Id not found in the URL
    if (!originalUrl) {
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
    const findURL = await ShortURL.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    // const updateData = await ShortURL.findOneAndUpdate({ _id: id }, { originalUrl: originalUrl }, { new: true })
    // const updateData = await ShortURL.findOneAndReplace({ _id: id }, { originalUrl: originalUrl }, { new: true })
    const updateData = await ShortURL.findByIdAndUpdate({ _id: id }, { originalUrl: originalUrl }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Short URL Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update short url.', data: null });
});

// Diffience unclear
const partialUpdateShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body; ///  4 - 5 Put (Full) (Patch partial)
    const { id } = req.params;

    // Bad Request if Id not found in the URL
    if (!originalUrl) {
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
    const findURL = await ShortURL.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    const updateData = await ShortURL.findByIdAndUpdate({ _id: id }, { originalUrl: originalUrl }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Short URL Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update short url.', data: null });
});

const deleteShortURlController = asyncHandler(async (req, res) => {

    const { id } = req.params;
    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Invalid ID

    // Find and Not found
    const findURL = await ShortURL.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Delete
    const deletedData = await ShortURL.findByIdAndDelete({ _id: id });
    if (deletedData) {
        return res.status(200).json({ message: 'Short URL Deleted', data: deletedData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to delete short url.', data: null });

});

module.exports = {
    getShortURlController,
    createShortURlController,
    updateShortURlController,
    partialUpdateShortURlController,
    deleteShortURlController
}