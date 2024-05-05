import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-localstorage';
import register from '../../interfaces/register.interface';
import login from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<User> | null | undefined;
  protected readonly storageService = inject(LocalStorageService);
  protected readonly storedToken = this.storageService.get<string>('token');

  constructor(private http: HttpClient) {}

  login({ email, password }: login): Observable<any> {
    return this.http.post<{ user: User }>(`api/auth/login`, {
      email,
      password,
    });
  }

  register({
    firstName,
    lastName,
    email,
    password,
    phone,
    role,
  }: register): Observable<any> {
    return this.http.post<{ user: User }>(`api/auth/register`, {
      firstName,
      lastName,
      email,
      password,
      phone,
      role,
    });
  }

  getCurrentUser(): Observable<any> | null {
    const token = this.getToken();
    if (token) {
      return this.http.get<{ user: User }>(`api/user`);
    } else {
      return null;
    }
  }

  getToken(): string | null {
    const token = this.storageService.get<string>('token');
    return token;
  }

  saveToken({ token }: { token: string }) {
    this.storageService.set<string>('token', token);
  }

  clearToken() {
    this.storageService.set('token', null);
  }
}
