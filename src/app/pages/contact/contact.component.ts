import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MailService } from '../../services/mail/mail.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  loading: boolean = false;

  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  constructor(
    private messageService: MessageService,
    private mailService: MailService
  ) {}

  onSubmit() {
    this.loading = true;
    const { email, name, message } = this.contactForm.value;
    this.mailService.sendContactMessage(email!, name!, message!).subscribe(
      (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail:
            'Your message has been sent successfully to our company email',
        });
        this.loading = false;
        this.contactForm.reset();
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to send your message. Please try again later',
        });
        this.loading = false;
      }
    );
  }
}
