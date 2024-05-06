import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../models/transaction.model';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { SkeletonModule } from 'primeng/skeleton';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [SkeletonModule, ButtonModule, RouterLink, CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent implements OnInit {
  loading: boolean = false;
  transactions: Transaction[] = [];
  user: User | undefined;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authService.getCurrentUser()?.subscribe(
      (response) => {
        this.user = response.user;
        this.transactionService.getAllTransactions().subscribe(
          (transactions) => {
            this.loading = false;
            if (response.user.role === 'admin') {
              this.transactions = transactions.data;
            } else {
              console.log(transactions.data);
              this.transactions = transactions.data.filter(
                (x: any) => x.user_id === response.user.id
              );
            }
          },
          (err) => {
            this.loading = false;
          }
        );
      },
      (err) => {
        this.loading = false;
      }
    );
  }
}
