const express = require('express');
const { getBusinessController, createBusinessController, updateBusinessController, partialUpdateBusinessController, deleteBusinessController, getBusinessByIdController } = require('../controllers/BusinessController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/', getBusinessController);
router.get('/:id', getBusinessByIdController);
router.post('/', authenticate, createBusinessController);
router.put('/:id/:ownerId', authenticate, authorize(['admin', 'user']), updateBusinessController);
router.patch('/:id/:ownerId', authenticate, authorize(['admin', 'user']), partialUpdateBusinessController);
router.delete('/:id/:ownerId', authenticate, authorize(['admin', 'user']), deleteBusinessController);

const businessRouter = router;
module.exports = businessRouter;
