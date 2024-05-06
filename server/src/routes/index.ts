import { Router } from 'express';
import AuthRoute from './AuthRoute';
import BlogRoute from './BlogRoute';
import HealthRoute from './HealthRoute';
import PaymentRoute from './PaymentRoute';
import ServiceRoute from './ServiceRoute';
import TestimonialRoute from './TestimonialRoute';
import TourRoute from './TourRoute';
import TransactionRoute from './TransactionRoute';
import UploadRoute from './UploadRoute';
import UserRoute from './UserRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/blogs', BlogRoute);
router.use('/tours', TourRoute);
router.use('/testimonials', TestimonialRoute);
router.use('/services', ServiceRoute);
router.use('/upload', UploadRoute);
router.use('/user', UserRoute);
router.use('/health', HealthRoute);
router.use('/payments', PaymentRoute);
router.use('/transactions', TransactionRoute);

export default router;
