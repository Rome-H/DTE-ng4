import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class DataTableService {
  apiUrl = 'http://localhost:5000/api/v1/datastructures/59b24e08ad590a12c494bc69';

  constructor(private http: HttpClient) { }
  getTable() {
    return this.http.get(this.apiUrl);
  }
}
