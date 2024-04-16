import { Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../../data/urls';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private http: HttpClient) {}
  // Get all testimonials
  getAllTestimonials(): Observable<any> {
    return this.http.get(`${BACKEND_API_URL}/api/testimonial`);
  }
}
