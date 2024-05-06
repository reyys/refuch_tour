import { UserController } from '@/controllers/UserController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { Router } from 'express';

const UserRoute = Router();

UserRoute.get('/', AuthMiddleware.authUser, UserController.getUserFromToken);

export default UserRoute;
