import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';


import { DataTableService } from '../../services/data-table/data-table.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user-service/user.service';

@Injectable()
export class DsContainerResolve implements Resolve<any> {

  constructor(private dataTableService: DataTableService,
               private userService: UserService,
               private firebaseService: FirebaseService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    console.log(1);
    return this.dataTableService.getTable() // TODO: need to pass id
      .then(() => {
      // create user
       this.userService.createUser(this.dataTableService.$dataTable['sessionUser']);
      })
      .then(() => {
      // start firebase
       const res = this.dataTableService.$dataTable;
       const db = res['sessionUser']['firebaseDatabase'];
       const token = res['firebaseRef']['authToken'];
       const path = res['firebaseRef']['dsPath'];

        this.firebaseService.auth(db, token)
          .then(() => {
            console.log('second then');
            return this.firebaseService.setRefs(path);
          })
          .then(() => {
            console.log('third then');
            return this.firebaseService.setDSLock();
          })
          .then(() => {
            console.log('fourth then');
            return this.firebaseService.listenLock();
          })
         .then(() => {
          console.log('fifth then');
          return this.firebaseService.checkConnected();
        });
      });
  }
}
