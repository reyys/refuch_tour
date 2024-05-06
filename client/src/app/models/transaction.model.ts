export interface Transaction {
  _id: string;
  user_id: string;
  transaction_id: string;
  transaction_time: string;
  transaction_status: string;
  settlement_time: string;
  order_id: string;
  payment_type: string;
  gross_amount: number;
}
