const express = require('express');
const { getUserController, createUserController, updateUserController, partialUpdateUserController, deleteUserController } = require('../controllers/userController');
const router = express.Router();

// GET
router.get('/', getUserController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.patch('/:id', partialUpdateUserController);
router.delete('/:id', deleteUserController);

const userRouter = router;
module.exports = userRouter;
