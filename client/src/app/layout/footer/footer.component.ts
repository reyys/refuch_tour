import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEnvelope, heroPhone } from '@ng-icons/heroicons/outline';
import { ButtonModule } from 'primeng/button';
import { MailService } from '../../services/mail/mail.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    NgIconComponent,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  viewProviders: [provideIcons({ heroEnvelope, heroPhone })],
  providers: [MessageService],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  loading: boolean = false;

  newsletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  menus: {
    label: string;
    children: {
      label: string;
      link: string;
    }[];
  }[] = [
    {
      label: 'Sitemap',
      children: [
        {
          label: 'Home',
          link: '/',
        },
        {
          label: 'About Us',
          link: '/#about',
        },
        {
          label: 'Testimonials',
          link: '/#testimonials',
        },
      ],
    },
    {
      label: 'Our Products',
      children: [
        {
          label: 'Tours',
          link: '/tours',
        },
        {
          label: 'Services',
          link: '/services',
        },
      ],
    },
    {
      label: 'Company',
      children: [
        {
          label: 'Contact',
          link: '/contact',
        },
        {
          label: 'Blogs',
          link: '/blogs',
        },
      ],
    },
  ];

  constructor(
    private mailService: MailService,
    private messageService: MessageService
  ) {}

  async onSubmit() {
    this.loading = true;
    const { email } = this.newsletterForm.value;
    this.mailService.subscribeNewsletter(email!).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Subscribed successfully to our newsletter',
        });
        this.loading = false;
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to subscribe the newsletter. Please try again later.',
        });
        this.loading = false;
      }
    );
  }
}
