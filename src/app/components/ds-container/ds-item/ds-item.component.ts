import { Component, Input, OnInit } from '@angular/core';
import { DataTableService } from '../../../services/data-table/data-table.service';

@Component({
  selector: 'q9-ds-item',
  templateUrl: './ds-item.component.html',
  styleUrls: ['./ds-item.component.css'],
})
export class DsItemComponent implements OnInit {

  @Input() selectedItem: any;

  constructor( private dataTableService: DataTableService ) {

  }
  ngOnInit() {}

  onEdit(val) {
    this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
    .subscribe();
  }
}
