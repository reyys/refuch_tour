import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all Blogs
  getAllBlogs(): Observable<any> {
    return this.http.get(`api/blogs`);
  }

  // Search blog by query
  searchBlog(title: string): Observable<any> {
    return this.http.get(`api/blogs?title=${title}`);
  }

  // Get Blog by Slug
  getBlogBySlug(slug: string): Observable<any> {
    return this.http.get(`api/blogs/${slug}`);
  }

  // Create new Blog
  createBlog(data: any): Observable<any> {
    return this.http.post(`api/blogs`, data);
  }

  // Update Blog by ID
  updateBlog(id: string, updatedBlog: any): Observable<any> {
    return this.http.put(`api/blogs/${id}`, updatedBlog);
  }

  // Delete Blog by ID
  deleteBlog(id: string): Observable<any> {
    return this.http.delete(`api/blogs/${id}`);
  }
}
