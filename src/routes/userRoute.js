const express = require('express');
const { getUserController, createUserController, updateUserController, partialUpdateUserController, deleteUserController, getUserByIdController } = require('../controllers/userController');
const router = express.Router();

router.get('/', getUserController);
router.get('/:id', getUserByIdController);
router.post('/', createUserController);
router.put('/:id', updateUserController);
router.patch('/:id', partialUpdateUserController);
router.delete('/:id', deleteUserController);

const userRouter = router;
module.exports = userRouter;
