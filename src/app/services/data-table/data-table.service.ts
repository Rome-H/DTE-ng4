import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


@Injectable()
export class DataTableService {
  apiUrl = 'http://localhost:5000/api/v1/datastructures/59b6779aa836bb2fce45bc2e';
  $dataTable: any;

  constructor(private http: HttpClient,
              private router: Router) {}

  getTable() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl)
        .subscribe(res => {
          this.$dataTable = res,
            console.log('data1', this.$dataTable);
          return resolve();
        });
    });
  }

  editMode() {
    return this.router.events
      .filter((val) => val instanceof NavigationEnd)
      .map((val) => {
        const sub = val['url'];
        if (sub.indexOf('edit') !== -1) {
          return true;
        } else {
          return false;
        }
      });
  }
}
