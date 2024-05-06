import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private http: HttpClient) {}
  // Get all testimonials
  getAllTestimonials(): Observable<any> {
    return this.http.get(`api/testimonials`);
  }

  // Create new testimonial
  createTestimonial(data: any): Observable<any> {
    return this.http.post(`api/testimonials`, data);
  }

  // Update testimonial by ID
  updateTestimonial(id: string, updatedTestimonial: any): Observable<any> {
    return this.http.put(`api/testimonials/${id}`, updatedTestimonial);
  }

  // Delete service by ID
  deleteTestimonial(id: string): Observable<any> {
    return this.http.delete(`api/testimonials/${id}`);
  }
}
