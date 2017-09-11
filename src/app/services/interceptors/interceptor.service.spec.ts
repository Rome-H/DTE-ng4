// import { TestBed, inject } from '@angular/core/testing';
//
// import { InterceptorService } from './interceptor.service';
// import {HttpModule, ResponseOptions, XHRBackend} from '@angular/http';
// import {MockBackend} from '@angular/http/testing';
//
// describe('InterceptorService', () => {
//   beforeEach(() => {
//
//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       providers: [
//         InterceptorService,
//         { provide: XHRBackend, useClass: MockBackend },
//       ]
//     });
//   });
//
//   describe('getDetails()', () => {
//     it('should return an Observable<Comment[]> with ok status',
//       inject([InterceptorService, XHRBackend], (InterceptorService, MockBackend) => {
//         const mockResponse = {
//           status: 'ok',
//           token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3RBZG1pbiIsImFkbWluIjp0cnVlfQ.nhC1EDI5xLGM4yZL2VMZyvHcbcWiXM2RVS7Y8Pt0Zuk'
//         }
//         MockBackend.connections.subscribe((connection) => {
//           connection.mockRespond(new Response(new ResponseOptions({
//             body: JSON.stringify(mockResponse)
//           })));
//         });
//         InterceptorService.subscribe((mockResponse) => {
//           expect(mockResponse.status).toEqual('ok');
//         });
//       }));
//   });
// });
