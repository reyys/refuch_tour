import { Component } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { transactions } from '../../../data/transactions';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  transactions: Transaction[] = transactions;
}
