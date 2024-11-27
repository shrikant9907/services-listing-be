const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const { StatusCodes } = require('http-status-codes');

const getCategoryController = asyncHandler(async (req, res) => {

    // const category = await Category.find({ title: "test" });
    const category = await Category.find(); // ALl Records 

    if (!category) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Unable to fatch user information ', data: category
        });
    }

    return res.status(StatusCodes.OK).json({ message: 'Category Fetched Successfully.', data: category });
});

const createCategoryController = asyncHandler(async (req, res) => {
    const { title } = req.body;

    // Original URL not found (Bad Request)
    if (!title) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Original URL is required', data: null
        });
    }

    const newShortUrl = new Category({
        title,
    })

    // Created
    const responseData = await newShortUrl.save(); // Save / Update
    if (responseData) {
        return res.status(StatusCodes.CREATED).json({ message: 'Category Create Successfully.', data: responseData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Something wrong.', data: responseData });
});

const updateCategoryController = asyncHandler(async (req, res) => {
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
    const findURL = await Category.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    // const updateData = await Category.findOneAndUpdate({ _id: id }, { title: title }, { new: true })
    // const updateData = await Category.findOneAndReplace({ _id: id }, { title: title }, { new: true })
    const updateData = await Category.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Category Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update category.', data: null });
});

// Diffience unclear
const partialUpdateCategoryController = asyncHandler(async (req, res) => {
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
    const findURL = await Category.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Update
    const updateData = await Category.findByIdAndUpdate({ _id: id }, { title: title }, { new: true }) // By Default original that's why passing third new parameter
    if (updateData) {
        return res.status(200).json({ message: 'Category Updated', data: updateData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to update category.', data: null });
});

const deleteCategoryController = asyncHandler(async (req, res) => {

    const { id } = req.params;
    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Invalid ID

    // Find and Not found
    const findURL = await Category.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Delete
    const deletedData = await Category.findByIdAndDelete({ _id: id });
    if (deletedData) {
        return res.status(200).json({ message: 'Category Deleted', data: deletedData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to delete category.', data: null });

});

module.exports = {
    getCategoryController,
    createCategoryController,
    updateCategoryController,
    partialUpdateCategoryController,
    deleteCategoryController
}