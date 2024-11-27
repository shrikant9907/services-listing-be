const express = require('express');
const { getCategoryController, createCategoryController, updateCategoryController, partialUpdateCategoryController, deleteCategoryController } = require('../controllers/categoryController');
const router = express.Router();

router.get('/', getCategoryController)
router.post('/', createCategoryController)
router.put('/:id', updateCategoryController)
router.patch('/:id', partialUpdateCategoryController)
router.delete('/:id', deleteCategoryController)

const categoryRouter = router;
module.exports = categoryRouter;