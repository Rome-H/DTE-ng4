import { Injectable } from '@angular/core';

import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  constructor(private cookieService: CookieService) { }
  public getToken(): string {
    return this.cookieService.get('auth-token');
  }
  public isAuthenticated() {
    // get the token
    const token = this.getToken();
    console.log(token);
    // return a boolean reflecting
    // whether or not the token is expired
  }
}
