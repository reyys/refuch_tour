import { CommonModule } from '@angular/common';
import { Component, OnInit, afterRender } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroBars3, heroXMark } from '@ng-icons/heroicons/outline';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIconComponent,
    CommonModule,
    ButtonModule,
    DialogModule,
    RouterLink,
    SkeletonModule,
  ],
  viewProviders: [provideIcons({ heroBars3, heroXMark })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  currentRoute: string | undefined = undefined;
  userLoading: boolean = false;
  user: User | undefined;
  menus: { label: string; link: string }[] = [
    { label: 'Home', link: '/' },
    { label: 'Tours', link: '/tours' },
    { label: 'Blogs', link: '/blogs' },
    { label: 'Services', link: '/services' },
    { label: 'Contact', link: '/contact' },
  ];

  showMenu = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userLoading = true;
    this.authService.getCurrentUser()?.subscribe(
      (response) => {
        this.authService.user = response.user;
        this.user = response.user;
        this.userLoading = false;
      },
      (err) => {
        this.userLoading = false;
      }
    );
  }

  signOut() {
    this.authService.clearToken();
    this.router.navigate(['']);
    this.user = undefined;
    this.showMenu = false;
  }

  toggleActiveRoute(activeRoute: string) {
    this.currentRoute = activeRoute;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
