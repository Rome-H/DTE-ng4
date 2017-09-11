import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../../auth/auth.service';
import 'rxjs/add/operator/do';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  request: any;
  constructor(private auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      request = request.clone({
        setHeaders: {
          // set header
          // get token from auth.getToken
          Authorization: `token ${this.auth.getToken()}`
        }
      });
      return next.handle(request).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
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
