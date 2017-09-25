import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from './../auth/auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor( private auth: AuthService ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          Authorization: `token ${this.auth.getToken()}`
        }
      });
      return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with success response if you want
          console.log(event);
        }
      }, (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // redirect to the login route
            // or show a modal
            console.log(err.status);
          }
        }
      });
  }
}
