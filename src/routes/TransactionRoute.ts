import { TransactionController } from '@/controllers/TransactionController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { Router } from 'express';

const TransactionRoute = Router();

TransactionRoute.get(
    '/',
    AuthMiddleware.authUser,
    TransactionController.getTransactions
);

export default TransactionRoute;
