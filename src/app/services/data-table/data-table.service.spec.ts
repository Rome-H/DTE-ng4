import { TestBed, inject } from '@angular/core/testing';

import { DataTableService } from './data-table.service';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {Http, HttpModule , ResponseOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHandler} from '@angular/common/http';
import 'rxjs/add/operator/map';

// beforeAll( () => {
// TestBed.initTestEnvironment(
//   BrowserDynamicTestingModule,
//   platformBrowserDynamicTesting());
// });

function createResponse(body) {
  return Observable.of(
    new Response(new ResponseOptions({ body}))
  );
}

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
    const bed = TestBed.configureTestingModule({
      providers: [
        DataTableService,
        { provide: Http, useClass: MockHttp },
        HttpClient,
        HttpHandler
      ]
    });

  http = bed.get(Http);
  service = bed.get(DataTableService);
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
