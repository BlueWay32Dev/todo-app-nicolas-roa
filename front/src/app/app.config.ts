import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { routes } from './app.routes';
import {authInterceptor} from "@core/interceptors/auth.interceptor";
import {errorInterceptor} from "@core/interceptors/error.interceptor";
import {loadingInterceptor} from "@core/interceptors/shared/loading.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(
    withInterceptors([
      authInterceptor,
      errorInterceptor,
      loadingInterceptor
    ])
  )]
};
