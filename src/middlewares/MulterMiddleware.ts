import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

export class MulterMiddleware {
    private static _multer = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    });

    public static async uploadSingleImage(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            MulterMiddleware._multer.single('image')(req, res, (e) => {
                if (e instanceof multer.MulterError) {
                    return res
                        .status(400)
                        .json({ success: false, message: e.message });
                } else if (e) {
                    return res.status(500).json({
                        success: false,
                        message: 'Make sure your field name is correct!'
                    });
                }
                next();
            });
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
