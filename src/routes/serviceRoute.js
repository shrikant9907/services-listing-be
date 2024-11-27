const express = require('express');
const { getserviceController, createserviceController, updateserviceController, partialUpdateserviceController, deleteserviceController } = require('../controllers/serviceController');
const router = express.Router();

// GET
router.get('/', getserviceController)
router.post('/', createserviceController)
router.put('/:id', updateserviceController)
router.patch('/:id', partialUpdateserviceController)
router.delete('/:id', deleteserviceController)

const serviceRouter = router;
module.exports = serviceRouter;