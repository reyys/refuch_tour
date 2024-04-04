import { TourController } from '@/controllers/TourController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { MulterMiddleware } from '@/middlewares/MulterMiddleware';
import { Router } from 'express';

const TourRoute = Router();

TourRoute.post(
    '/',
    AuthMiddleware.authAdmin,
    MulterMiddleware.upload.single('image'),
    TourController.addTour
);
TourRoute.delete('/:id', AuthMiddleware.authAdmin, TourController.deleteTour);
TourRoute.get('/:id', TourController.getTourById);
TourRoute.get('/', TourController.getTours);

export default TourRoute;
