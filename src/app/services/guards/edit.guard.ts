import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class EditGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | any {
    // if (this.firebaseService.lockObj === undefined || this.firebaseService.lastActionObj === undefined || this.firebaseService.offsetObj === undefined) {
    //   console.log(this.firebaseService.lockObj, this.firebaseService.lastActionObj, this.firebaseService.offsetObj);
    //   return false;
    // } else {
    //   return true;
    // }
    return true;
  }
}
