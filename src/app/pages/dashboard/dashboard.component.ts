import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenu, TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { AdminToursComponent } from './admin-tours/admin-tours.component';
import { AdminBlogsComponent } from './admin-blogs/admin-blogs.component';
import { AdminServicesComponent } from './admin-services/admin-services.component';
import { TransactionsComponent } from './transactions/transactions.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    TabMenuModule,
    BadgeModule,
    CommonModule,
    TransactionsComponent,
    AdminToursComponent,
    AdminBlogsComponent,
    AdminServicesComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  items: MenuItem[] = [];

  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Transactions', icon: 'pi pi-fw pi-receipt' },
      { label: 'Tours', icon: 'pi pi-fw pi-shopping-bag' },
      { label: 'Blogs', icon: 'pi pi-fw pi-file' },
      { label: 'Services', icon: 'pi pi-fw pi-pencil' },
    ];
    this.activeItem = this.items[0];
  }

  changeActiveItem(tab: TabMenu) {
    this.activeItem = tab.activeItem;
  }
}
