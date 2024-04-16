import { Transaction } from '../models/transaction.model';

export const transactions: Transaction[] = [
  {
    _id: '1',
    transaction_id: 'TXN123',
    transaction_time: '2024-04-15T12:00:00Z',
    transaction_status: 'Success',
    settlement_time: '2024-04-15T12:05:00Z',
    order_id: 'ORD001',
    payment_type: 'Credit Card',
    gross_amount: 100.5,
  },
  {
    _id: '2',
    transaction_id: 'TXN456',
    transaction_time: '2024-04-15T13:00:00Z',
    transaction_status: 'Success',
    settlement_time: '2024-04-15T13:05:00Z',
    order_id: 'ORD002',
    payment_type: 'PayPal',
    gross_amount: 75.25,
  },
  {
    _id: '3',
    transaction_id: 'TXN789',
    transaction_time: '2024-04-15T14:00:00Z',
    transaction_status: 'Failed',
    settlement_time: 'N/A',
    order_id: 'ORD003',
    payment_type: 'Debit Card',
    gross_amount: 120.75,
  },
];
