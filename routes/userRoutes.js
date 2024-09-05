const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller');


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and authentication
 */


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register', userController.createUser);


/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Logs in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', userController.loginUser);

/**
 * @swagger
 * /api/users/forget-password:
 *   post:
 *     summary: Forget request to receive reset code
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset code sent successfully
 *       400:
 *         description: Bad request (e.g., email not found)
 *       500:
 *         description: Internal server error
 */
router.post('/forget-password',userController.forgetPassword)

/**
 * @swagger
 * /api/users/reset-password:
 *   post:
 *     summary: Reset Password
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Password Changed Successfully
 *       401:
 *         description: Something we wrong
 *       500:
 *         description: Internal server error
 */
router.post('/reset-password',userController.resetPassword)

module.exports = router;
