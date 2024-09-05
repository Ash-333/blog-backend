const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');


// Register a new user
router.post('/register', userController.createUser);

// Log in an existing user
router.post('/login', userController.loginUser);

//Forget password
router.post('/forget-password',userController.forgetPassword)

//Reset password
router.post('/reset-password',userController.resetPassword)

module.exports = router;
