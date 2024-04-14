import { UploadService } from '@/services/UploadService';
import { Request, Response } from 'express';

export class UploadController {
    public static async uploadImage(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No image uploaded' });
            }

            const imageUrl = await UploadService.upload(req.file);
            return res.status(201).json({ imageUrl });
        } catch (e) {
            return res.status(500).json({ message: (e as Error).message });
        }
    }
}
