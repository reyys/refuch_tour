import { TourController } from '@/controllers/TourController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { Router } from 'express';

const TourRoute = Router();

TourRoute.post('/', AuthMiddleware.authAdmin, TourController.addTour);
TourRoute.delete('/:id', AuthMiddleware.authAdmin, TourController.deleteTour);
// TourRoute.get('/:id', TourController.getTourById);
TourRoute.get('/:slug', TourController.getTourBySlug);
TourRoute.get('/', TourController.getTours);

export default TourRoute;
