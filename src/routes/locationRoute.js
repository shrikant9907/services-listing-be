const express = require('express');
const { getLocationController, createLocationController, updateLocationController, partialUpdateLocationController, deleteLocationController } = require('../controllers/locationController');
const router = express.Router();

router.get('/', getLocationController)
router.post('/', createLocationController)
router.put('/:id', updateLocationController)
router.patch('/:id', partialUpdateLocationController)
router.delete('/:id', deleteLocationController)

const locationRouter = router;
module.exports = locationRouter;