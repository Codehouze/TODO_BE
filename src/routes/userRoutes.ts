/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for managing user Authentication
 * /user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: Successful response. Returns the requested user.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: example_user@example.com
 *       404:
 *         description: User not found.
 *     security:
 *       - bearerAuth: []
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The email of the new user
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         description: The password of the new user
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for user authentication
 *     responses:
 *       201:
 *         description: User created successfully. Returns the created user.
 *         content:
 *           application/json:
 *             example:
 *               id: 2
 *               email: new_user@example.com
 *               password: pa55234
 *       400:
 *         description: Bad request. email and password parameters are required.
 *     security:
 *       - bearerAuth: []
 * /user/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's password
 *     responses:
 *       200:
 *         description: Successful response. User logged in successfully.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: updated_user@example.com
 *       404:
 *         description: User email or password is incorrect.
 *     security:
 *       - bearerAuth: []
 * 
 */

import express from "express";
import userCtrl from "../controllers/userCtrl";
import validator from "../middlewares/validate";

const router = express.Router();

router.post("/login", validator.signupValidator, userCtrl.login); // login

router.post("/signup", validator.signupValidator, userCtrl.signUp); // signup

router.get("/:id", userCtrl.getOne); //  return a user

export default router;
