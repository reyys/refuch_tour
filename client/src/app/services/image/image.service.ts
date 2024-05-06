import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(data: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', data);
    return this.http.post(`api/upload/image`, formData);
  }
}
