const express = require('express');
const { getUserController, createUserController, updateUserController, partialUpdateUserController, deleteUserController, getUserByIdController } = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const router = express.Router();

router.get('/:id', authenticate, authorize(['user', 'admin']), getUserByIdController);
router.get('/', authenticate, authorize('admin'), getUserController);
router.post('/', authenticate, authorize('admin'), createUserController);
router.put('/:id', authenticate, authorize(['user', 'admin']), updateUserController);
router.patch('/:id', authenticate, authorize(['user', 'admin']), partialUpdateUserController);
router.delete('/:id', authenticate, authorize('admin'), deleteUserController);

const userRouter = router;
module.exports = userRouter;
