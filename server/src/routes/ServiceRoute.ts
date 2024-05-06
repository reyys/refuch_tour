import { ServiceController } from '@/controllers/ServiceController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { Router } from 'express';

const ServiceRoute = Router();

ServiceRoute.post('/', AuthMiddleware.authAdmin, ServiceController.addService);
ServiceRoute.delete(
    '/:id',
    AuthMiddleware.authAdmin,
    ServiceController.deleteService
);
// ServiceRoute.get('/:id', ServiceController.getServiceById);
ServiceRoute.get('/:slug', ServiceController.getServiceBySlug);
ServiceRoute.get('/', ServiceController.getServices);
ServiceRoute.put(
    '/:id',
    AuthMiddleware.authAdmin,
    ServiceController.updateService
);

export default ServiceRoute;
