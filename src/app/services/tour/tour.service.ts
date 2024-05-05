import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  constructor(private http: HttpClient) {}

  // Get all tours
  getAllTours(): Observable<any> {
    return this.http.get(`api/tours`);
  }

  // Search tour by query
  searchTour(name: string): Observable<any> {
    return this.http.get(`api/tours?name=${name}`);
  }

  // Get tour by Slug
  getTourBySlug(slug: string): Observable<any> {
    return this.http.get(`api/tours/${slug}`);
  }

  // Create new tour
  createTour(data: any): Observable<any> {
    return this.http.post(`api/tours`, data);
  }

  // Update tour by ID
  updateTour(id: string, updatedTour: any): Observable<any> {
    return this.http.put(`api/tours/${id}`, updatedTour);
  }

  // Delete tour by ID
  deleteTour(id: string): Observable<any> {
    return this.http.delete(`api/tours/${id}`);
  }
}
