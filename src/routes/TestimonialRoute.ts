import { TestimonialController } from '@/controllers/TestimonialController';
import { Router } from 'express';

const TestimonialRoute = Router();

TestimonialRoute.get('/', TestimonialController.getTestimonials);

export default TestimonialRoute;
