import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SkeletonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  loading: boolean = true;
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe(
      (response) => {
        this.transactions = response.data;
        this.loading = false;
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
