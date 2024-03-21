import { Router } from 'express';
import AuthRoute from './AuthRoute';
import TourRoute from './TourRoute';

const router = Router();

router.use('/api/auth', AuthRoute);
router.use('/api/tour', TourRoute);

export default router;
