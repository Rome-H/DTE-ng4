import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { FirebaseService } from '../firebase/firebase.service';


@Injectable()
export class EditResolve implements Resolve<any> {
  constructor( private firebaseService: FirebaseService ) {}

  resolve( route: ActivatedRouteSnapshot ) {

      this.firebaseService.setDSLock()
        .then(() => {
          console.log(5);
          return this.firebaseService.listenLock();
        })
        .then(() => {
          console.log(6);
          return this.firebaseService.checkConnected();
        });
  }
}
