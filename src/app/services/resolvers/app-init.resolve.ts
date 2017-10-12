import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { DataTableService } from '../../services/data-table/data-table.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user-service/user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AppInitResolve implements Resolve<any> {

  constructor(
    private dataTableService: DataTableService,
    private userService: UserService,
    private firebaseService: FirebaseService,
    private cookieService: CookieService // for ipad
  ) { }

  resolve(route: ActivatedRouteSnapshot) {

        // for ipad
     this.cookieService.set('auth-token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTlhZTU1NGJlMjY3ZDUxNmFlMzg0NmU5IiwiaWF0IjoxNTA3NzI1NjAzLCJleHAiOjE1MDgzMzA0MDN9.kZ4CxXyxCgpmO4y28oDzXBENgL_hMV7W1v3JT9qbvtM');

      return this.dataTableService.getTable(route.params.id) // TODO: tell that i'm passing id now
        .then(() => {
          // create user
          this.userService.createUser(this.dataTableService.dataTable['sessionUser']); // TODO-ask to optimize backend-duplicate user object
        })
        .then(() => {
          // start firebase
          const res = this.dataTableService.dataTable;
          const db = res['sessionUser']['firebaseDatabase'];
          const token = res['firebaseRef']['authToken'];
          const path = res['firebaseRef']['dsPath'];

          return this.firebaseService.auth(db, token)
            .then(() => {
              console.log(1);
              return this.firebaseService.setRefs(path);
            })
            .then(() => {
              console.log(2);
              return this.firebaseService.checkConnected();
            });
        });
  }
}
