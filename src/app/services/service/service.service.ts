import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { BACKEND_API_URL } from '../../data/urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}

  // Get all services
  getAllServices(): Observable<any> {
    return this.http.get(`${BACKEND_API_URL}/api/service`);
  }

  // Get service by Slug
  getServiceBySlug(slug: string): Observable<any> {
    return this.http.get(`${BACKEND_API_URL}/api/service/${slug}`);
  }

  // Create new service
  createService(data: any): Observable<any> {
    return this.http.post(`${BACKEND_API_URL}/api/service`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Update service by ID
  updateService(id: string, updatedTour: any): Observable<any> {
    return this.http
      .put(`${BACKEND_API_URL}/api/service/${id}`, updatedTour, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          // Handle error
          console.error(`Error updating service with ID ${id}:`, error);
          throw error;
        })
      );
  }

  // Delete service by ID
  deleteService(id: string): Observable<any> {
    return this.http
      .delete(`${BACKEND_API_URL}/api/service/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          // Handle error
          console.error(`Error deleting tour with ID ${id}:`, error);
          throw error;
        })
      );
  }
}
