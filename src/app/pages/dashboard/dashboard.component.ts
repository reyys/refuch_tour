import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenu, TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { AdminToursComponent } from './admin-tours/admin-tours.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminServicesComponent } from './admin-services/admin-services.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AdminTestimonialsComponent } from './admin-testimonials/admin-testimonials.component';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TabMenuModule,
    BadgeModule,
    CommonModule,
    ButtonModule,
    TransactionsComponent,
    AdminToursComponent,
    AdminBlogsComponent,
    AdminServicesComponent,
    AdminTestimonialsComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  user: User | null | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUser()?.subscribe((response) => {
      this.authService.user = response.user;
      this.user = response.user;
      if (response.user.role === 'admin') {
        this.items = [
          { label: 'Transactions', icon: 'pi pi-fw pi-receipt' },
          { label: 'Tours', icon: 'pi pi-fw pi-shopping-bag' },
          { label: 'Blogs', icon: 'pi pi-fw pi-file' },
          { label: 'Services', icon: 'pi pi-fw pi-pencil' },
          { label: 'Testimonials', icon: 'pi pi-fw pi-user-edit' },
        ];
        this.activeItem = this.items[0];
      } else {
        this.items = [{ label: 'Transactions', icon: 'pi pi-fw pi-receipt' }];
        this.activeItem = this.items[0];
      }
    });
  }

  changeActiveItem(tab: TabMenu) {
    this.activeItem = tab.activeItem;
  }

  signOut() {
    this.authService.clearToken();
    this.router.navigate(['']);
    this.user = undefined;
  }
}
