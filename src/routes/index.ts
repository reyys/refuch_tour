import { Router } from 'express';
import AuthRoute from './AuthRoute';
import BlogRoute from './BlogRoute';
import TestimonialRoute from './TestimonialRoute';
import TourRoute from './TourRoute';
import UploadRoute from './UploadRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/blog', BlogRoute);
router.use('/tour', TourRoute);
router.use('/testimonial', TestimonialRoute);
router.use('/upload', UploadRoute);

export default router;
