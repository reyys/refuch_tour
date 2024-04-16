import { Tour } from '@/models/TourModel';
import { Transaction } from '@/models/TransactionModel';
import { User } from '@/models/UserModel';
import { MidtransClient } from 'midtrans-node-client';
import { TransactionRequestType } from 'midtrans-node-client/dist/types/snap';
import { v4 as uuidv4 } from 'uuid';

const snap = new MidtransClient.Snap({
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
    isProduction: false
});

export class PaymentService {
    public static async createInvoiceUrl(
        userId: string,
        tourId: string,
        finishUrl: string
    ) {
        try {
            const params = await this.createPaymentParams(
                userId,
                tourId,
                finishUrl
            );
            const redirect_url =
                await snap.createTransactionRedirectUrl(params);
            return redirect_url;
        } catch (e) {
            console.error(e);
            throw new Error(`Error creating payment: ${e}`);
        }
    }

    public static async handlePaymentNotification(
        notification: Record<string, string>
    ) {
        try {
            await snap.transaction.notification(notification);
            const data = {
                transaction_id: notification.transaction_id,
                transaction_time: notification.transaction_time,
                transaction_status: notification.transaction_status,
                settlement_time: notification.settlement_time,
                order_id: notification.order_id,
                payment_type: notification.payment_type,
                gross_amount: notification.gross_amount
            };
            await Transaction.findOneAndUpdate(
                { transaction_id: data.transaction_id },
                data,
                { upsert: true, new: true }
            );
        } catch (e) {
            console.error(e);
            throw new Error(`Error handling payment notification: ${e}`);
        }
    }

    private static async createPaymentParams(
        userId: string,
        tourId: string,
        finishUrl: string
    ) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const tour = await Tour.findById(tourId);
        if (!tour) {
            throw new Error('Tour not found');
        }

        return {
            snapFull: {
                transaction_details: {
                    order_id: `REFUCH-${uuidv4()}`,
                    gross_amount: tour.price
                },
                item_details: {
                    id: tour._id.toString(),
                    price: tour.price,
                    quantity: 1,
                    name: tour.name
                },
                customer_details: {
                    first_name: user.firstName,
                    last_name: user.lastName,
                    email: user.email,
                    phone: user.phone
                },
                credit_card: {
                    secure: true
                },
                callbacks: {
                    finish: finishUrl
                }
            }
        } as Partial<TransactionRequestType>;
    }
}
