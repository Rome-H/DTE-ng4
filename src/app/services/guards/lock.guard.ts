import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class LockGuard implements CanActivate {
  constructor(private fireBaseService: FirebaseService) {
  }

  canActivate(): Observable<boolean> | any {
      return true;
  }
}
