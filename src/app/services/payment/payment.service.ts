import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../../data/urls';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  payTour(boughtTourId: string): Observable<any> {
    return this.http.post(
      `${BACKEND_API_URL}/api/payment/pay`,
      {
        boughtTourId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
