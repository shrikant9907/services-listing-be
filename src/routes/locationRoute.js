const express = require('express');
const { getLocationController, createLocationController, updateLocationController, partialUpdateLocationController, deleteLocationController } = require('../controllers/locationController');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.get('/', getLocationController)
router.post('/', authenticate, createLocationController)
router.put('/:id', authenticate, authorize('admin'), updateLocationController)
router.patch('/:id', authenticate, authorize('admin'), partialUpdateLocationController)
router.delete('/:id', authenticate, authorize('admin'), deleteLocationController)

const locationRouter = router;
module.exports = locationRouter;