import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { DataTableService } from '../../services/data-table/data-table.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user-service/user.service';
import { EditResolve } from './edit.resolve';

@Injectable()
export class AppInitResolve implements Resolve<any> {
  constructor(private dataTableService: DataTableService,
               private userService: UserService,
               private firebaseService: FirebaseService,
              private editResolve: EditResolve
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.dataTableService.getTable() // TODO: need to pass id
      .then(() => {
      // create user
       this.userService.createUser(this.dataTableService.dataTable['sessionUser']); // TODO - ask to optimize backend -duplicate user object
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
          })
          .then(() => {
            console.log(3);
            return this.firebaseService.listenLastUpdate();
          });

       // return new Promise((resolve, reject) => {
       //   this.firebaseService.auth(db, token)
       //     .then(() => {
       //       console.log(1);
       //       return this.firebaseService.setRefs(path);
       //     })
       //     .then(() => {
       //       console.log(2);
       //       return this.firebaseService.checkConnected();
       //     })
       //     .then(() => {
       //       console.log(3);
       //       return this.firebaseService.listenLastUpdate();
       //     })
       //     .then(() => resolve());
       // });
      });
  }
}
