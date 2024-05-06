import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  // Get all services
  getAllServices(): Observable<any> {
    return this.http.get(`api/services`);
  }

  // Get service by Slug
  getServiceBySlug(slug: string): Observable<any> {
    return this.http.get(`api/services/${slug}`);
  }

  // Create new service
  createService(data: any): Observable<any> {
    return this.http.post(`api/services`, data);
  }

  // Update service by ID
  updateService(id: string, updatedService: any): Observable<any> {
    return this.http.put(`api/services/${id}`, updatedService);
  }

  // Delete service by ID
  deleteService(id: string): Observable<any> {
    return this.http.delete(`api/services/${id}`);
  }
}
