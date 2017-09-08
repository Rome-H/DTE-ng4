import { Component, OnInit } from '@angular/core';

// internal service
import {DataTableService} from '../../../services/data-table/data-table.service';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.css']
})
export class DsListComponent implements OnInit {
  // array of our dropped items
  public itemsDropped: Array<any> = [];
  constructor(private dataTableService: DataTableService, private authService: AuthService) {
  }

  ngOnInit() {
    console.log(this.authService.getToken());
  this.dataTableService.getTable()// need id
      .subscribe(
        (res) => {
          console.log(res);
          },
        (err) => {
         console.error(err);
        }
      );
  }
}
