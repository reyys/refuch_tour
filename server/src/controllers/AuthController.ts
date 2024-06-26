import { User } from '@/models/UserModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MongoError } from 'mongodb';
import mongoose from 'mongoose';

export class AuthController {
    public static async register(req: Request, res: Response) {
        try {
            const user = new User(req.body);
            await user.save();

            const payload = {
                _id: user._id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET!);

            res.status(201).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            });
        } catch (e) {
            console.error(e);
            if ((e as MongoError).code === 11000) {
                return res.status(400).json({
                    success: false,
                    message: 'A user with the same email exists!'
                });
            } else if (e instanceof mongoose.Error.ValidationError) {
                return res.status(400).json({
                    success: false,
                    message: e.message
                });
            } else {
                return res
                    .status(500)
                    .json({ success: false, message: 'Internal server error' });
            }
        }
    }

    public static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user || !user.validatePassword(password)) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password'
                });
            }

            const payload = {
                _id: user._id,
                email: user.email,
                role: user.role
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET!);

            res.status(200).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    role: user.role
                }
            });
        } catch (e) {
            console.error(e);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
