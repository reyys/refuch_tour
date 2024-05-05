import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, CommonModule, NgIconComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  loading = false;
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  registerSubmit() {
    this.loading = true;
    this.authService
      .register({
        ...(this.registerForm.value as {
          firstName: string;
          lastName: string;
          phone: string;
          email: string;
          password: string;
        }),
        role: 'user',
      })
      .subscribe(
        (response) => {
          this.authService.saveToken({ token: response.token });
          this.authService.user = response.user;
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Success',
            detail: 'Your account has been created successfully',
          });
          this.loading = false;
          this.router.navigate(['/dashboard']);
          window.location.reload();
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: error.error.message,
          });
          this.loading = false;
        }
      );
  }
}
