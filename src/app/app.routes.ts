import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourDetailComponent } from './pages/tours/tour-detail/tour-detail.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { BlogDetailComponent } from './pages/blogs/blog-detail/blog-detail.component';
import { ServiceComponent } from './pages/services/service.component';
import { ServiceDetailComponent } from './pages/services/service-detail/service-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'tours',
    component: ToursComponent,
  },
  {
    path: 'tours/:slug',
    component: TourDetailComponent,
  },
  {
    path: 'blogs',
    component: BlogsComponent,
  },
  {
    path: 'blogs/:slug',
    component: BlogDetailComponent,
  },
  {
    path: 'services',
    component: ServiceComponent,
  },
  {
    path: 'services/:slug',
    component: ServiceDetailComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
