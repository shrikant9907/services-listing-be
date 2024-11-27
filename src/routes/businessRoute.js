const express = require('express');
const { getBusinessController, createBusinessController, updateBusinessController, partialUpdateBusinessController, deleteBusinessController, getBusinessByIdController } = require('../controllers/BusinessController');
const router = express.Router();

router.get('/', getBusinessController);
router.get('/:id', getBusinessByIdController);
router.post('/', createBusinessController);
router.put('/:id', updateBusinessController);
router.patch('/:id', partialUpdateBusinessController);
router.delete('/:id', deleteBusinessController);

const businessRouter = router;
module.exports = businessRouter;
