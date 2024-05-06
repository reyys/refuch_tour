import { User } from '@/models/UserModel';
import { Request, Response } from 'express';

export class UserController {
    public static async getUserFromToken(req: Request, res: Response) {
        try {
            const user = await User.findById(res.locals.user._id);
            if (!user) {
                return res
                    .status(404)
                    .json({ success: false, message: 'User not found' });
            }

            return res.status(200).json({
                success: true,
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
            return res
                .status(500)
                .json({ success: false, message: 'Internal server error' });
        }
    }
}
