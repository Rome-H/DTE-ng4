import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Router} from "@angular/router";

@Injectable()
export class DataTableService {
  apiUrl = 'http://localhost:5000/api/v1/datastructures/59b6779aa836bb2fce45bc2e';

  constructor(private http: HttpClient,
              private router: Router) {}

  getTable() {
    return this.http.get(this.apiUrl);
  }
}
