import {Component, OnInit, Output} from '@angular/core';

// internal service
import { DataTableService } from '../../../services/data-table/data-table.service';
import { DragulaService } from 'ng2-dragula';

import 'rxjs/add/operator/take';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.css']
})
export class DsListComponent implements OnInit {
  // array of our dropped items
  @Output()
  public itemsDropped: Array<any> = [];

  @Output()
  selectedItem = [];
  itemToDelete: any;
  editMode: any;
  showDsItem = false;
  formObject: any;
  constructor( private dataTableService: DataTableService,
               private dragulaService: DragulaService ) {
    this.dataTableService.editMode()
    .subscribe((res) => {
      this.editMode = res;
    });
  }

  ngOnInit() {
    this.itemsDropped = this.dataTableService.dataTable['fields'];
    console.log(this.itemsDropped);
    // dragula event for adding the item after drop
    this.dragulaService.dropModel.subscribe(() => {
      // loop for looking for index of new inserted item
      for (let i = 0; i < this.itemsDropped.length; i++) {
        if (this.itemsDropped[i].id === 'new') {
          this.itemsDropped[i].id = '';
          this.formObject = {
            description: this.itemsDropped[i].description,
            label: this.itemsDropped[i].name,
            name: this.itemsDropped[i].type,
            placeholder: this.itemsDropped[i].placeholder,
            required: true
          }
          this.addItems(i, this.formObject, this.itemsDropped[i]);
        }
      }
    });
    // dragula event for remove the item
    this.dragulaService.remove.subscribe(() => {
      this.delete();
    });
    // dragula event for changing the index item
    this.dragulaService.dragend.subscribe(() => {
      this.changeIndex();
    });
  }

  addItems(i, formObject , item) {
   this.dataTableService.insertFormObject(i, formObject)
     .subscribe((res) => {
       // saving id from dataBase for to be able to delete this object after add without refreshing the page
       item.id = res.id;
     });
  }

  delete() {
    this.dataTableService.deleteFormObject(this.itemToDelete)
      .subscribe(() => this.showDsItem = false);
  }

  // get id of item we want to delete
  itemDelete(item) {
    this.itemToDelete = item.id;
  }

    selectItem(item) {
     this.selectedItem = item;
     this.showDsItem = true;
   }

   changeIndex() {
    for ( let i = 0; i < this.itemsDropped.length; i++ ) {
       if (this.itemToDelete === this.itemsDropped[i].id) {
          this.dataTableService.updateFormObjectIndex(i, this.itemToDelete)
            .subscribe(res => console.log(res));
          }
       }
    }
}
