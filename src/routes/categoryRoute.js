const express = require('express');
const { getCategoryController, createCategoryController, updateCategoryController, partialUpdateCategoryController, deleteCategoryController } = require('../controllers/categoryController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/', getCategoryController)
router.post('/', authenticate, createCategoryController)
router.put('/:id', authenticate, authorize('admin'), updateCategoryController)
router.patch('/:id', authenticate, authorize('admin'), partialUpdateCategoryController)
router.delete('/:id', authenticate, authorize('admin'), deleteCategoryController)

const categoryRouter = router;
module.exports = categoryRouter;