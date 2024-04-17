import { Transaction } from '@/models/TransactionModel';
import { Request, Response } from 'express';

export class TransactionController {
    public static async getTransactions(req: Request, res: Response) {
        try {
            const transactions = await Transaction.find();
            if (!transactions) {
                return res.status(404).send({
                    success: false,
                    message: 'No transactions found'
                });
            }

            res.send({
                success: true,
                count: transactions.length,
                data: transactions
            });
        } catch (e) {
            console.error(e);
            res.status(500).send({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
