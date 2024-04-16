import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_API_URL } from '../../data/urls';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(data: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', data);
    return this.http.post(`${BACKEND_API_URL}/api/upload/image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }
}
