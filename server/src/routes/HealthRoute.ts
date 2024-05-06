import { HealthController } from '@/controllers/HealthController';
import { Router } from 'express';

const HealthRoute = Router();

HealthRoute.get('/', HealthController.healthCheck);

export default HealthRoute;
