import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BACKEND_API_URL } from './data/urls';
import { LocalStorageService } from 'ngx-localstorage';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const storageService = inject(LocalStorageService);
    const token = storageService.get<string>('token');
    const apiReq = req.clone({
      url: `${BACKEND_API_URL}/${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(apiReq).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
          console.log(req.url, 'returned a response with status', event.status);
        }
      })
    );
  }
}
