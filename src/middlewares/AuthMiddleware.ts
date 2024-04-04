import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class AuthMiddleware {
    public static async authAdmin(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const authHeader = req.headers.authorization;
        const token =
            authHeader?.startsWith('Bearer') && authHeader.substring(7);

        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET!, async (e, decoded) => {
            if (e || !decoded) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Invalid token' });
            }

            res.locals.user = decoded;

            if ((decoded as JwtPayload).role === 'admin') {
                return next();
            }

            return res.status(403).json({ success: false });
        });
    }

    public static async authUser(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const authHeader = req.headers.authorization;
        const token =
            authHeader?.startsWith('Bearer') && authHeader.substring(7);

        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: 'No token provided' });
        }

        jwt.verify(token, process.env.JWT_SECRET!, async (e, decoded) => {
            if (e || !decoded) {
                return res
                    .status(401)
                    .json({ success: false, message: 'Invalid token' });
            }

            res.locals.user = decoded;
            return next();
        });
    }
}
