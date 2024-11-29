const asyncHandler = require('express-async-handler');
const Service = require('../models/serviceModel');
const { StatusCodes } = require('http-status-codes');

const getserviceController = asyncHandler(async (req, res) => {

    const testCat = '67499e2c6445d4ea0684684b';
    // const title = 'Event Managment';
    const title = 'Welding Service - Updated';


    const services = await Service.aggregate([
        { // Filter
            $match: {
                title: {
                    $eq: title
                }
            }
        },
        {
            $lookup: {
                from: "category",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $project: {
                "title": 1,
                "category": 1,
                "createdAt": 1,
            }
        },
        {
            $sort: {
                "createdAt": -1
            }
        },
        {
            $limit: 2
        },
        // {
        //     $count: "totalUsers"
        // }
    ]);

    if (!services) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Unable to fatch user information ', data: services
        });
    }

    return res.status(StatusCodes.OK).json({ message: 'Service Fetched Successfully.', data: services });
});

const getserviceControllerBck = asyncHandler(async (req, res) => {

    const services = await Service.find()
        .sort({ '_id': -1 })
        .populate('category')
        .populate('location');

    if (!services) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Unable to fatch user information ', data: services
        });
    }

    return res.status(StatusCodes.OK).json({ message: 'Service Fetched Successfully.', data: services });
});

const createserviceController = asyncHandler(async (req, res) => {
    const { title, category, location } = req.body;

    // Title not found (Bad Request)
    if (!title || !category || !location) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Title, Category and Location are required', data: null
        });
    }

    const newShortUrl = new Service({
        title,
        category,
        location
    })

    // Created
    const responseData = await newShortUrl.save(); // Save / Update
    if (responseData) {
        return res.status(StatusCodes.CREATED).json({ message: 'Service Create Successfully.', data: responseData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Something wrong.', data: responseData });
});

const updateserviceController = asyncHandler(async (req, res) => {
    const { title } = req.body;
    const { id } = req.params;

    // Bad Request if Id not found in the URL
    if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Title is required', data: null
        });
    }

    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Find and Not found
    const findURL = await Service.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    const updateData = await Service.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Service Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update service.', data: null });
});

// Diffience unclear
const partialUpdateserviceController = asyncHandler(async (req, res) => {
    const { title } = req.body; ///  4 - 5 Put (Full) (Patch partial)
    const { id } = req.params;

    // Bad Request if Id not found in the URL
    if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Title is required', data: null
        });
    }

    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Find and Not found
    const findURL = await Service.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    const updateData = await Service.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Service Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update service.', data: null });
});

const deleteserviceController = asyncHandler(async (req, res) => {

    const { id } = req.params;
    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Invalid ID

    // Find and Not found
    const findURL = await Service.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Delete
    const deletedData = await Service.findByIdAndDelete({ _id: id });
    if (deletedData) {
        return res.status(200).json({ message: 'Service Deleted', data: deletedData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to delete service.', data: null });

});

module.exports = {
    getserviceController,
    createserviceController,
    updateserviceController,
    partialUpdateserviceController,
    deleteserviceController
}