const express = require('express');
const { signupController, loginController, refreshTokenController } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/refresh-token', refreshTokenController);

const authRouter = router;
module.exports = authRouter;
