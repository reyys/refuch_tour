import { AuthController } from '@/controllers/AuthController';
import { Router } from 'express';

const AuthRoute = Router();

AuthRoute.post('/register', AuthController.register);
AuthRoute.post('/login', AuthController.login);

export default AuthRoute;
