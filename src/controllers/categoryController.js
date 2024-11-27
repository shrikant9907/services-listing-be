const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
const { StatusCodes } = require('http-status-codes');
const { validateObjectId, sendResponse } = require('../utils/helper');
const validator = require('validator');

const getCategoryController = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    if (!categories || categories.length === 0) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'No categories found');
    }

    return sendResponse(res, StatusCodes.OK, 'Categories fetched successfully', categories);
});

const createCategoryController = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title || !validator.isLength(title, { min: 3, max: 100 })) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Title is required and should be between 3 and 100 characters');
    }

    const existingCategory = await Category.findOne({ title });
    if (existingCategory) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'A category with this title already exists');
    }

    const newCategory = new Category({ title });

    const savedCategory = await newCategory.save();

    if (savedCategory) {
        return sendResponse(res, StatusCodes.CREATED, 'Category created successfully', savedCategory);
    }

    return sendResponse(res, StatusCodes.FORBIDDEN, 'Error creating category');
});

const updateCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Category ID');
    }

    if (!title || !validator.isLength(title, { min: 3, max: 100 })) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Title is required and should be between 3 and 100 characters');
    }

    // Check if the title is being updated and if the new title already exists
    const existingCategory = await Category.findOne({ title });
    if (existingCategory && existingCategory._id.toString() !== id) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'A category with this title already exists');
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, { title }, { new: true });

    if (!updatedCategory) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Category not found');
    }

    return sendResponse(res, StatusCodes.OK, 'Category updated successfully', updatedCategory);
});

const partialUpdateCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Category ID');
    }

    // Check if the title is being updated and if the new title already exists
    if (updateData.title) {
        const existingCategory = await Category.findOne({ title: updateData.title });
        if (existingCategory && existingCategory._id.toString() !== id) {
            return sendResponse(res, StatusCodes.BAD_REQUEST, 'A category with this title already exists');
        }
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCategory) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Category not found');
    }

    return sendResponse(res, StatusCodes.OK, 'Category partially updated', updatedCategory);
});

const deleteCategoryController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid Category ID');
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'Category not found');
    }

    return sendResponse(res, StatusCodes.OK, 'Category deleted successfully', deletedCategory);
});

module.exports = {
    getCategoryController,
    createCategoryController,
    updateCategoryController,
    partialUpdateCategoryController,
    deleteCategoryController
};
