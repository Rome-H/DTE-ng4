import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  NavigationEnd,
  Router
} from '@angular/router';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { apiUrl } from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class DataTableService {

  dataTable: any; // TODO - store data and Behaviour Subject or Observable
  id: any;
  edit: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getTable(id: any) { // TODO : tell that i'm passing an id from resolve

    return new Promise((resolve, reject) => {
      this.http.get(`${apiUrl}${id}`)
        .subscribe(res => {
          this.dataTable = res;
          this.id = id;   // TODO tell: this set id here because i need to use it globally in another cases
          resolve();
        });
    });
  }

  editMode() {
    return this.router.events
      .filter((val) => val instanceof NavigationEnd) // TODO I've tried it all. and it works correct only with NavigationEnd
      .map((val) => (val['url'].indexOf('edit') !== -1));
  }

  insertFormObject(i, formObject): Observable<any>  {
    return this.http.post(`${apiUrl}${this.id}/fields`,
      { index: i,
        formObject: formObject,
        // TODO tell that in angular 1.5 it's dsObject.version definition and dsObject is res from getTable in ng4
        dsVersion: this.dataTable['versionDefinition']});
  }

  updateFormObject(objId, formObj): Observable<any> {
   return this.http.put(`${apiUrl}${this.id}/fields/${objId}`, {
     dsVersion: this.dataTable['versionDefinition'],
     formObject: formObj
   });
  }
  updateFormObjectIndex(newIndex, fieldId): Observable<any> {
    return this.http.put(`${apiUrl}${this.id}/fields`, {
      fieldId,
      newIndex,
      dsVersion: this.dataTable['versionDefinition']
    });
  }


  deleteFormObject(id): Observable<any> {
  return this.http.delete(`${apiUrl}${this.id}/fields?dsVersion=${this.dataTable['versionDefinition']}&fieldId=${id}`).share();
  }
}
