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

    this.itemsDropped = this.dataTableService.dataTable['fields'];

  }
}
