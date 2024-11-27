const express = require('express');
const { signupController, loginController } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);

const authRouter = router;
module.exports = authRouter;
