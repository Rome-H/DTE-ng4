import { Component, OnInit } from '@angular/core';

import { DataTableService } from '../../services/data-table/data-table.service';

import { ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/pluck';


@Component({
  selector: 'q9-ds-container',
  templateUrl: './ds-container.component.html',
  styleUrls: ['./ds-container.component.css']
})
export class DsContainerComponent implements OnInit {

  editMode: any;
  user = this.route.snapshot.data;
  constructor(private dataTableService: DataTableService,
              private route: ActivatedRoute) {
    // call router state
    dataTableService.editMode().subscribe((res) => this.editMode = res);
  }

  ngOnInit() {
  }

}
