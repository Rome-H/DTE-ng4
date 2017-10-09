import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { DataTableService } from '../../../../services/data-table/data-table.service';

@Component({
  selector: 'q9-ds-list-dialog',
  templateUrl: './ds-list-dialog.component.html',
  styleUrls: ['./ds-list-dialog.component.scss']
})
export class DsListDialogComponent implements OnInit {

  items: any = [];
  dataTable: any = [];
  constructor(
              private dialogRef: MdDialogRef<DsListDialogComponent>,
              @Inject(MD_DIALOG_DATA) public data: any,
              private dataTableService: DataTableService) { }

  ngOnInit() {
    // filling of select in dialog
    this.dataTableService.getData().subscribe(
      res => {
        this.dataTable = res['fields'];
        for (let i = 0; i < this.dataTable.length; i++) {
          if (this.dataTable[i].type === 'listInput' || this.dataTable[i].type === 'nestedListInput') {
            console.log(this.dataTable[i]);
            this.items.push(this.dataTable[i]);
          }
        }
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
