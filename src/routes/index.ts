import { Router } from 'express';
import AuthRoute from './AuthRoute';
import BlogRoute from './BlogRoute';
import TourRoute from './TourRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/blog', BlogRoute);
router.use('/tour', TourRoute);

export default router;
