import express from 'express';
import { authentication } from '../middlewares/authentication';
import { login, signup, viewUsers, singleUser, deleteUser, editUser } from '../modules/todoUser/controllers/todouserController';

const router = express.Router();

/**
 * @swagger
 * /todousers/signup:
 *   post:
 *     summary: Signup a new user
 *     requestBody:
 *       description: User data
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
 *           example:
 *             username: "john_doe"
 *             email: "john@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/signup", signup);

/**
 * @swagger
 * /todousers/login:
 *   post:
 *     summary: Login a user
 *     requestBody:
 *       description: User credentials
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
 *           example:
 *             email: "john@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", login);

/**
 * @swagger
 * /todousers/viewusers:
 *   get:
 *     summary: Get a list of all users
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All users retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     token:
 *                       type: string
 *       500:
 *         description: Internal Server Error
 */
router.get("/viewusers", authentication , viewUsers);

/**
 * @swagger
 * /todousers/singleUser/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/singleUser/:id", authentication ,singleUser);

/**
 * @swagger
 * /todousers/editUser/{id}:
 *   put:
 *     summary: Edit a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       description: New user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *           example:
 *             username: "new_username"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User edited successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/editUser/:id", authentication ,editUser);

/**
 * @swagger
 * /todousers/deleteUser/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         username:
 *                           type: string
 *                         email:
 *                           type: string
 *                     token:
 *                       type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/deleteUser/:id", authentication ,deleteUser);

export default router;
