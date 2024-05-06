import { Injectable } from '@angular/core';
import { MAIL_API_URL } from '../../data/urls';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  sendContactMessage(
    email: string,
    name: string,
    message: string
  ): Observable<any> {
    return this.httpClient.post(`${MAIL_API_URL}/api/message`, {
      email,
      name,
      message,
    });
  }

  subscribeNewsletter(email: string): Observable<any> {
    return this.httpClient.post(`${MAIL_API_URL}/api/newsletter`, {
      email,
    });
  }
}
