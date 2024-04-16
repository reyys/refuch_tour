import { PaymentService } from '@/services/PaymentService';
import { Request, Response } from 'express';

export class PaymentController {
    public static async createPayment(req: Request, res: Response) {
        try {
            const invoice_url = await PaymentService.createInvoiceUrl(
                res.locals.user._id,
                req.body.boughtTourId,
                `${req.get('origin')}/dashboard`
            );

            res.status(200).json({
                success: true,
                invoice_url
            });
        } catch (e) {
            console.error(e);
            if (e instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: e.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: 'Error creating payment'
                });
            }
        }
    }

    public static async handlePaymentNotification(req: Request, res: Response) {
        try {
            const notification = req.body;
            await PaymentService.handlePaymentNotification(notification);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    }
}
