import { Component, OnInit } from '@angular/core';

import { DataTableService } from '../../services/data-table/data-table.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';


@Component({
  selector: 'q9-ds-container',
  templateUrl: './ds-container.component.html',
  styleUrls: ['./ds-container.component.scss']
})
export class DsContainerComponent implements OnInit {

  editMode: any;

  constructor(private dataTableService: DataTableService) {
    dataTableService.editMode()
      .subscribe((res) => this.editMode = res); // TODO - check why this works only in 'constructor'
  }

  ngOnInit() {
  }

}
