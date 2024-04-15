import { PaymentController } from '@/controllers/PaymentController';
import { AuthMiddleware } from '@/middlewares/AuthMiddleware';
import { Router } from 'express';

const PaymentRoute = Router();

PaymentRoute.post(
    '/pay',
    AuthMiddleware.authUser,
    PaymentController.createPayment
);
PaymentRoute.post('/notification', PaymentController.handlePaymentNotification);

export default PaymentRoute;
