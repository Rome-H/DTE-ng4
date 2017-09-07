import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataTableService {
  apiUrl = 'localhost:????/api/v1/datastructures/';

  constructor(private http: HttpClient) { }
  getTable(id: string): Observable<any>  {
    return this.http.get(this.apiUrl + id);
  }
}
