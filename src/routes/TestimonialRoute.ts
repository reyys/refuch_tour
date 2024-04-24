import { TestimonialController } from '@/controllers/TestimonialController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { Router } from 'express';

const TestimonialRoute = Router();

TestimonialRoute.get('/', TestimonialController.getTestimonials);
TestimonialRoute.get('/:id', TestimonialController.getTestimonialById);
TestimonialRoute.post(
    '/',
    AuthMiddleware.authAdmin,
    TestimonialController.addTestimonial
);
TestimonialRoute.patch(
    '/:id',
    AuthMiddleware.authAdmin,
    TestimonialController.updateTestimonial
);
TestimonialRoute.delete(
    '/:id',
    AuthMiddleware.authAdmin,
    TestimonialController.deleteTestimonial
);

export default TestimonialRoute;
