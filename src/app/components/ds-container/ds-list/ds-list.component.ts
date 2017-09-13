import { Component, OnInit } from '@angular/core';

// internal service
import { DataTableService } from '../../../services/data-table/data-table.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.css']
})
export class DsListComponent implements OnInit {
  // array of our dropped items
  public itemsDropped: Array<any> = [];

  constructor(
    private dataTableService: DataTableService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.dataTableService.getTable()// need id
      .subscribe(
        (res) => {
          console.log(123, res);
          // get fields from response and put them in an array: itemsDroppred
          this.itemsDropped = res['fields'];
          this.startFireBase(res['sessionUser']['firebaseDatabase'], res['firebaseRef']['authToken'], res['firebaseRef']['dsPath']);
          console.log('arr', this.itemsDropped);
        },
        (err) => {
          console.error(err);
        }
      );
  }

  startFireBase(db, token, path) {

    this.firebaseService.firebaseDatabase = db;
    this.firebaseService.firebaseToken = token;

    this.firebaseService.auth()
      .then(() => {
        console.log('second then');
        return this.firebaseService.setRefs(path);
      })
      .then(() => {
        console.log('third then');
        this.firebaseService.setDSLock();
      })
      .then(() => {
        console.log('fourth then');
        this.firebaseService.listenLock();
      });
  }
}
