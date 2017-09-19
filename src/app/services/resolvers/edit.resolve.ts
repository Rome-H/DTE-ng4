import { Injectable } from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import { DataTableService } from '../../services/data-table/data-table.service';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user-service/user.service';
import { AppInitResolve } from './app-init.resolve';

@Injectable()
export class EditResolve implements Resolve<any> {
  constructor(private dataTableService: DataTableService,
              private userService: UserService,
              private firebaseService: FirebaseService,
              private  route: ActivatedRoute,
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
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
