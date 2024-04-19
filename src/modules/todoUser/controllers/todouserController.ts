import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, deleteUserById, findUserByEmail, findUserById, getAllUsers, editUserByUsername } from '../repository/todouserRepo';

const secretKey = 'your-secret-key';

// Login
export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'No user found with the provided email',
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(404).json({
                status: 'fail',
                message: 'Incorrect password',
            });
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

        return res.status(200).json({
            status: 'success',
            data: {
                user,
                token,
            },
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};

// Signup
export const signup = async (req: express.Request, res: express.Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(404).json({
                status: 'fail',
                message: 'Missing required user credentials',
            });
        }

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User already exists',
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(200).json({
            status: 'success',
            data: newUser,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};

// View all users
export const viewUsers = async (req: express.Request, res: express.Response) => {
    try {
        const allUsers = await getAllUsers();
        return res.status(200).json({
            message: 'All users retrieved successfully',
            data: allUsers,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};

// Get a single user
export const singleUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        return res.status(200).json({
            message: 'User retrieved successfully',
            data: user,
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};

// Edit user
export const editUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const { username } = req.body;

        const updatedUser = await editUserByUsername(userId, username);

        if (!updatedUser) {
            return res.status(404).json({
                message: `User with ${userId}} is not found.`,
            });
        }

        return res.status(200).json({
            message: 'User edited successfully',
            data: updatedUser,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};

// Delete user
export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const userId = req.params.id;
        const existingUser = await findUserById(userId);

        if (!existingUser) {
            return res.status(404).json({
                message: 'User not found',
            });
        }

        const deletedUser = await deleteUserById(userId);

        return res.status(200).json({
            message: 'User deleted successfully',
            data: deletedUser,
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            code: error.code,
        });
    }
};
