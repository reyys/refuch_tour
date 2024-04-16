import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../../data/urls';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import register from '../../interfaces/register.interface';
import login from '../../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<User> | null | undefined;

  constructor(private http: HttpClient) {}

  login({ email, password }: login): Observable<any> {
    return this.http.post<{ user: User }>(`${BACKEND_API_URL}/api/auth/login`, {
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
    return this.http.post<{ user: User }>(
      `${BACKEND_API_URL}/api/auth/register`,
      {
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
      }
    );
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<{ user: User }>(`${BACKEND_API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
