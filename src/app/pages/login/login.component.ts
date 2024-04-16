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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, CommonModule, NgIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loading = false;
  loginForm = new FormGroup({
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

  async loginSubmit() {
    this.loading = true;
    this.authService
      .login(
        this.loginForm.value as {
          email: string;
          password: string;
        }
      )
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.authService.user = response.user;
          this.messageService.add({
            severity: 'success',
            summary: 'Login Success',
            detail: 'Login Successful. Redirecting to Dashboard',
          });
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid Email or Password',
          });
          this.loading = false;
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
        }
      );
  }
}
