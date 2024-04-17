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
router.use('/blog', BlogRoute);
router.use('/tour', TourRoute);
router.use('/testimonial', TestimonialRoute);
router.use('/service', ServiceRoute);
router.use('/upload', UploadRoute);
router.use('/user', UserRoute);
router.use('/health', HealthRoute);
router.use('/payment', PaymentRoute);
router.use('/transaction', TransactionRoute);

export default router;
