import {Component, Input, OnInit, Output} from '@angular/core';
import {ISubscription} from 'rxjs/Subscription';

// internal service
import {DataTableService} from '../../../services/data-table/data-table.service';
import {DragulaService} from 'ng2-dragula';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/first';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.scss']
})
export class DsListComponent implements OnInit {
  // array of our dropped items

  public itemsDropped: Array<any> = [];
  @Output() selectedItem = [];
  @Input() showDsItem = false;

  selectedItemId: any;
  editMode: any;
  formObject: any;
  dragulaSub: ISubscription;

  constructor(private dataTableService: DataTableService,
              private dragulaService: DragulaService) {
    this.dataTableService.editMode()
      .subscribe((res) => {
        this.editMode = res;
        if (!res) {
          this.unSub();
        }
      });
  }

  ngOnInit() {
    this.itemsDropped = this.dataTableService.dataTable.fields;
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
    this.dragulaSub = this.dragulaService.remove.subscribe(() => {
      this.delete(this.selectedItemId);
    });
    // dragula event for changing the index item
    this.dragulaService.dragend.subscribe(() => {
      this.changeIndex();
    });
  }

  addItems(i, formObject, item) {
    this.dataTableService.insertFormObject(i, formObject)
      .subscribe((res) => {
        // saving id from dataBase for to be able to delete this object after add without refreshing the page
        item.id = res.id;
      });
  }

  delete(id) {
    if (id) {
      this.dataTableService.deleteFormObject(id)
        .subscribe(() => this.showDsItem = false);
    }
  }

  // get id of item we want to delete
  itemDelete(item) {
    if (this.editMode) {
      this.selectedItemId = item.id;
    }
  }

  selectItem(item) {
    if (this.selectedItem !== item) {
      this.selectedItem = item;
      this.showDsItem = true;
    } else {
      this.selectedItem = [];
      this.showDsItem = false;
    }
  }

  changeIndex() {
    for (let i = 0; i < this.itemsDropped.length; i++) {
      if (this.selectedItemId === this.itemsDropped[i].id) {
        this.dataTableService.updateFormObjectIndex(i, this.selectedItemId)
          .subscribe(res => console.log(res));
      }
    }
  }

  unSub() {
    if (this.dragulaSub) {
      this.dragulaSub.unsubscribe();
    }
  }


}
