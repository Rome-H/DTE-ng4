import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectorRef
} from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

// internal service
import { DataTableService } from '../../../services/data-table/data-table.service';
import { DragulaService } from 'ng2-dragula';
import { FirebaseService } from '../../../services/firebase/firebase.service';

import { MdDialog } from '@angular/material';
import { DsListDialogComponent } from './ds-list-dialog/ds-list-dialog.component';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.scss']
})
export class DsListComponent implements OnInit, OnDestroy {
  // array of our dropped items

  public itemsDropped: Array<any> = [];
  @Output() selectedItem = [];
  @Output() editMode: any;
  showDsItem = false;
  selectedItemId: any;
  formObject: any;
  dragulaSub: ISubscription;
  addItemsub: ISubscription;
  parentId: any;

  constructor(private dataTableService: DataTableService,
              private dragulaService: DragulaService,
              private firebaseService: FirebaseService,
              private dialog: MdDialog,
              private cd: ChangeDetectorRef) {
    this.dataTableService.editMode()
      .subscribe((res) => {
        this.editMode = res;
      });
    this.itemsDropped = this.dataTableService.dataTable.fields;
    // dragula event for adding the item after drop
    this.dragulaService.dropModel.subscribe((res) => {
      // loop for looking for index of new inserted item
      for (let i = 0; i < this.itemsDropped.length; i++) {
        if (this.itemsDropped[i].id === 'new') {
          this.itemsDropped[i].id = '';
          // dialog box for nested list
          if (this.itemsDropped[i].type === 'nestedListInput' ) {
            const dialogRef = this.dialog.open(DsListDialogComponent, {
              height: '184px',
              width: '300px',
              data: {parentId: this.parentId}
            });
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              console.log(1111, result);
              const res = result;
              this.formObject = {
                dataStructureFieldSpecification: res.id,
                description: this.itemsDropped[i].description,
                label: this.itemsDropped[i].name,
                name: this.itemsDropped[i].type,
                placeholder: this.itemsDropped[i].placeholder,
                required: true
              };
              this.addItemsub = this.dataTableService.insertFormObject(i, this.formObject)
                .subscribe((res) => {
                  // saving id from dataBase for to be able to delete this object after add without refreshing the page
                  this.itemsDropped[i] = res;
                  this.selectItem(this.itemsDropped[i]);
                  this.firebaseService.setLastAction();
                });
            });
            // end dialog box for nested list
          } else {
          this.formObject = {
            description: this.itemsDropped[i].description,
            label: this.itemsDropped[i].name,
            name: this.itemsDropped[i].type,
            placeholder: this.itemsDropped[i].placeholder,
            required: true
          };

            this.addItemsub = this.dataTableService.insertFormObject(i, this.formObject)
              .subscribe((res) => {
                // saving id from dataBase for to be able to delete this object after add without refreshing the page
                this.itemsDropped[i] = res;
                this.selectItem(this.itemsDropped[i]);
                this.firebaseService.setLastAction();
              });
          }
        }
        // end loop for looking for index of new inserted item
      }
    });
  }

  ngOnInit() {
    // dragula event for remove the item
    this.dragulaSub = this.dragulaService.remove.subscribe(() => {
      this.delete(this.selectedItemId);
    });
    // dragula event for changing the index item
    this.dragulaService.dragend.subscribe(() => {
      this.changeIndex();
    });
  }

  delete(id) {
    if (id) {
      this.dataTableService.deleteFormObject(id)
        .subscribe(() => {
        this.showDsItem = false
          this.firebaseService.setLastAction();
      });
    }
  }

  // get id of item we want to delete
  itemDelete(item) {
    if (this.editMode) {
      this.selectedItemId = item.id;
    }
  }

  selectItem(item) { // TODO make like subscription
    if (this.selectedItem['id'] !== item.id) {
      this.selectedItem = [];
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
          .subscribe(res => {
            this.firebaseService.setLastAction();
          });
      }
    }
  }
  // event data from ds-item
  recieveEvent($event) {
    this.showDsItem = $event;
  }

   ngOnDestroy() {
    this.selectedItem = [];
    this.showDsItem = false;
    if (this.dragulaSub) {
     this.dragulaSub.unsubscribe();
    }
    if (this.addItemsub) {
     this.addItemsub.unsubscribe();
    }
   }

}
