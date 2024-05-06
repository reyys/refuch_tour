import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideNgxLocalstorage } from 'ngx-localstorage';
import { ApiInterceptor } from './api-interceptor';
import { StoreModule, provideStore } from '@ngrx/store';
import { userReducer } from './states/reducers/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      StoreModule.forRoot({
        auth: userReducer,
      })
    ),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    provideNgxLocalstorage({
      prefix: 'demo',
      delimiter: '@',
    }),
    MessageService,
    ConfirmationService,
    BrowserModule,
    BrowserAnimationsModule,
  ],
};
