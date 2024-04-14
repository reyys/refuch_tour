import { PaymentController } from '@/controllers/PaymentController';
import { Router } from 'express';

const PaymentRoute = Router();

PaymentRoute.post('/pay', PaymentController.createPayment);
PaymentRoute.post('/notification', PaymentController.handlePaymentNotification);

export default PaymentRoute;
