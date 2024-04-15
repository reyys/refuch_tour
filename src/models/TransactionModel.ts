import { Schema, Types, model } from 'mongoose';

export interface ITransaction {
    _id: Types.ObjectId;
    transaction_id: string;
    transaction_time: string;
    transaction_status: string;
    settlement_time: string;
    order_id: string;
    payment_type: string;
    gross_amount: number;
}

const TransactionSchema = new Schema<ITransaction>(
    {
        transaction_id: {
            type: String,
            required: true
        },
        transaction_time: {
            type: String,
            required: true
        },
        transaction_status: {
            type: String,
            required: true
        },
        settlement_time: {
            type: String
        },
        order_id: {
            type: String,
            required: true
        },
        payment_type: {
            type: String,
            required: true
        },
        gross_amount: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

export const Transaction = model<ITransaction>(
    'Transaction',
    TransactionSchema
);
