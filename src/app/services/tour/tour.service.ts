import { Injectable } from '@angular/core';
import { Tour } from '../../models/tour.model';
import { BACKEND_API_URL } from '../../data/urls';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}

  // Get all tours
  getAllTours(): Observable<any> {
    return this.http.get(`${BACKEND_API_URL}/api/tour`);
  }

  // Get tour by Slug
  getTourBySlug(slug: string): Observable<any> {
    return this.http.get(`${BACKEND_API_URL}/api/tour/${slug}`);
  }
  // Create new tour
  createTour(data: any): Observable<any> {
    return this.http.post(`${BACKEND_API_URL}/api/tour`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Update tour by ID
  updateTour(id: string, updatedTour: any): Observable<any> {
    return this.http
      .put(`${BACKEND_API_URL}/api/tour/${id}`, updatedTour, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          // Handle error
          console.error(`Error updating tour with ID ${id}:`, error);
          throw error;
        })
      );
  }

  // Delete tour by ID
  deleteTour(id: string): Observable<any> {
    return this.http
      .delete(`${BACKEND_API_URL}/api/tour/${id}`, {
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
