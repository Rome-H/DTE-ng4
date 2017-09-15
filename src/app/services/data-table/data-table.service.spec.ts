import { TestBed, inject } from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Http, HttpModule, ResponseOptions, Response} from '@angular/http';
import {HttpClient, HttpHandler} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { DataTableService } from './data-table.service';

// beforeAll( () => {
// TestBed.initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting());
// });

const createResponse = body =>  Observable.of(
  new Response(new ResponseOptions({ body}))
);

// fake backend
class MockHttp {
  get() {
    return createResponse([[]]);
  }
}

describe('DataTableService', () => {
  let service: DataTableService;
  let http: Http;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataTableService,
        { provide: Http, useClass: MockHttp },
        HttpClient,
        HttpHandler
      ]
    });

    http = TestBed.get(Http);
    service = TestBed.get(DataTableService);
  });

  it('should get items', () => {
    // fake array
    const Items = [];
    spyOn(http, 'get').and.returnValue(createResponse([...Items]));

    service.getTable()
      .map((res) => {
      console.log(res);
      });
  });
});
