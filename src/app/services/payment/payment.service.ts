import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  payTour(boughtTourId: string): Observable<any> {
    return this.http.post(`api/payments/pay`, {
      boughtTourId,
    });
  }
}
