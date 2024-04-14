import { Router } from 'express';
import AuthRoute from './AuthRoute';
import BlogRoute from './BlogRoute';
import TestimonialRoute from './TestimonialRoute';
import TourRoute from './TourRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/blog', BlogRoute);
router.use('/tour', TourRoute);
router.use('/testimonial', TestimonialRoute);

export default router;
