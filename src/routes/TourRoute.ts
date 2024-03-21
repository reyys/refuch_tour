import { TourController } from '@/controllers/TourController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { MulterMiddleware } from '@/middlewares/MulterMiddleware';
import { Router } from 'express';

const TourRoute = Router();

TourRoute.post(
    '/addTour',
    AuthMiddleware.authUser,
    MulterMiddleware.upload.single('image'),
    TourController.addTour
);
TourRoute.delete(
    '/deleteTour/:tourId',
    AuthMiddleware.authUser,
    TourController.deleteTour
);
TourRoute.get('/getTour/:tourId', TourController.getTour);
TourRoute.get('/getTours', TourController.getTours);

export default TourRoute;
