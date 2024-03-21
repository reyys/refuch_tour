import multer from 'multer';

export class MulterMiddleware {
    public static upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    });
}
