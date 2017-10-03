import { Component, Input, OnInit, Output } from '@angular/core';
import { DataTableService } from '../../../services/data-table/data-table.service';

@Component({
  selector: 'q9-ds-item',
  templateUrl: './ds-item.component.html',
  styleUrls: ['./ds-item.component.scss'],
})
export class DsItemComponent implements OnInit {

  @Input() selectedItem: any;
  @Output() showDsItem: any;

  // TODO one way binding
  constructor( private dataTableService: DataTableService ) {

  }
  ngOnInit() {}

  onEdit(val) {
    this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
    .subscribe();
  }
  hide() {
    this.showDsItem = false;
  }
}
