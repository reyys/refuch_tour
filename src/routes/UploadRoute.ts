import { UploadController } from '@/controllers/UploadController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { MulterMiddleware } from '@/middlewares/MulterMiddleware';
import { Router } from 'express';

const UploadRoute = Router();

UploadRoute.post(
    '/image',
    AuthMiddleware.authAdmin,
    MulterMiddleware.upload.single('image'),
    UploadController.uploadImage
);

export default UploadRoute;
