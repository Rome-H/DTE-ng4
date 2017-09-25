import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  constructor( private cookieService: CookieService ) { }

  public getToken(): string {
    return this.cookieService.get('auth-token');
  }
}
