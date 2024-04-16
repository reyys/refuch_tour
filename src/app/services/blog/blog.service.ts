import { Injectable } from '@angular/core';
import { BACKEND_API_URL } from '../../data/urls';
import { Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  // Get all Blogs
  getAllBlogs(): Observable<any> {
    return this.http.get(`${BACKEND_API_URL}/api/blog`);
  }

  // Get Blog by Slug
  getBlogBySlug(slug: string): Observable<any> {
    return this.http.get(`${BACKEND_API_URL}/api/blog/${slug}`);
  }

  // Create new Blog
  createBlog(data: any): Observable<any> {
    return this.http.post(`${BACKEND_API_URL}/api/blog`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  // Update Blog by ID
  updateBlog(id: string, updatedTour: any): Observable<any> {
    return this.http
      .patch(`${BACKEND_API_URL}/api/blog/${id}`, updatedTour, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .pipe(
        catchError((error) => {
          // Handle error
          console.error(`Error updating Blog with ID ${id}:`, error);
          throw error;
        })
      );
  }

  // Delete Blog by ID
  deleteBlog(id: string): Observable<any> {
    return this.http
      .delete(`${BACKEND_API_URL}/api/blog/${id}`, {
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
