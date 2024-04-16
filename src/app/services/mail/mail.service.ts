import { Injectable } from '@angular/core';
import { MAIL_API_URL } from '../../data/urls';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  constructor(private http: HttpClient) {}

  sendContactMessage(
    email: string,
    name: string,
    message: string
  ): Observable<any> {
    return this.http.post(`${MAIL_API_URL}/api/message`, {
      email,
      name,
      message,
    });
  }

  subscribeNewsletter(email: string): Observable<any> {
    return this.http.post(`${MAIL_API_URL}/api/newsletter`, {
      email,
    });
  }
}
