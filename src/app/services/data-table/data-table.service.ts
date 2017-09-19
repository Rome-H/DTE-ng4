import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


@Injectable()
export class DataTableService {
  apiUrl = 'http://localhost:5000/api/v1/datastructures/59b6779aa836bb2fce45bc2e';
  dataTable: any; // TODO - store data and Behaviour Subject or Observable

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getTable() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl)
        .subscribe(res => {
          this.dataTable = res;
          resolve();
        });
    });
  }

  editMode() {
    return this.router.events
      .filter((val) => val instanceof NavigationEnd)
      .map((val) => (val['url'].indexOf('edit') !== -1));
  }
}
