import { Router } from 'express';
import AuthRoute from './AuthRoute';
import BlogRoute from './BlogRoute';
import HealthRoute from './HealthRoute';
import ServiceRoute from './ServiceRoute';
import TestimonialRoute from './TestimonialRoute';
import TourRoute from './TourRoute';
import UploadRoute from './UploadRoute';
import UserRoute from './UserRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/blog', BlogRoute);
router.use('/tour', TourRoute);
router.use('/testimonial', TestimonialRoute);
router.use('/service', ServiceRoute);
router.use('/upload', UploadRoute);
router.use('/user', UserRoute);
router.use('/health', HealthRoute);

export default router;
