import { ITour, Tour } from '@/models/TourModel';
import { PaymentService } from '@/services/PaymentService';
import { Request, Response } from 'express';

export class PaymentController {
    public static async createPayment(req: Request, res: Response) {
        try {
            const boughtTour: ITour | null = await Tour.findById(
                req.body.boughtTourId
            ).lean();

            if (!boughtTour) {
                return res.status(400).json({
                    success: false
                });
            }

            const redirect_url = await PaymentService.createPaymentRedirectUrl(
                res.locals.user._id,
                boughtTour
            );

            res.status(200).json({
                success: true,
                redirect_url: redirect_url
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    public static async handlePaymentNotification(req: Request, res: Response) {
        try {
            const notification = req.body;
            await PaymentService.handlePaymentNotification(notification);
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}
