const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usercontrolller/UserController");

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with name, email, and password.
 *     tags: ['Users']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password for the new user.
 *     security: []
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Invalid request parameters.
 *       409:
 *         description: Email already exists.
 */

router.post("/register", userController.register); 


/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user using email and password.
 *     tags: ['Users']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password.
 *     security: []
 *     responses:
 *       200:
 *         description: User successfully authenticated.
 *       401:
 *         description: Invalid email or password.
 *       400:
 *         description: Bad request. Missing or malformed parameters.
 */

router.post("/login", userController.login);    


module.exports = router;
