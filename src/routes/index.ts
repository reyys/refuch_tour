import { Router } from 'express';
import AuthRoute from './AuthRoute';
import TourRoute from './TourRoute';

const router = Router();

router.use('/auth', AuthRoute);
router.use('/tour', TourRoute);

export default router;
