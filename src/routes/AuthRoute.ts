import { AuthController } from '@/controllers/AuthController';
import { Router } from 'express';

const AuthRoute = Router();

AuthRoute.post('/signup', AuthController.signUp);
AuthRoute.post('/signin', AuthController.signIn);

export default AuthRoute;
