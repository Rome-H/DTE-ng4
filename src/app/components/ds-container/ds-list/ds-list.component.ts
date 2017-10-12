import {
  Component, ElementRef,
  OnDestroy,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import * as autoScroll from 'dom-autoscroller';

// internal service
import { DataTableService } from '../../../services/data-table/data-table.service';
import { DragulaService } from 'ng2-dragula';
import { FirebaseService } from '../../../services/firebase/firebase.service';

import { MdDialog } from '@angular/material';
import { DsListDialogComponent } from './ds-list-dialog/ds-list-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.scss'],
})
export class DsListComponent implements OnInit, OnDestroy {
  // array of our dropped items

  public itemsDropped: Array<any> = [];
  @Output() selectedItem = [];
  @Output() editMode: any;
  showDsItem = false;
  selectedItemId: any;
  formObject: any;
  dragulaRemoveSub: ISubscription;
  dragulaDropSub: ISubscription;
  addItemsub: ISubscription;
  parentId: any;

  @ViewChild('autoscroll') autoscroll: ElementRef;

  constructor(private dataTableService: DataTableService,
              private dragulaService: DragulaService,
              private firebaseService: FirebaseService,
              private route: ActivatedRoute,
              private dialog: MdDialog
              ) {
    this.dataTableService.editMode()
      .subscribe((res) => {
        this.editMode = res;
      });
    this.itemsDropped = this.dataTableService.dataTable.fields;
    // dragula event for adding the item after drop
    this.dragulaDropSub = this.dragulaService.dropModel.subscribe((res) => {
      // loop for looking for index of new inserted item
      for (let i = 0; i < this.itemsDropped.length; i++) {
        if (this.itemsDropped[i].id === 'new') {
          this.itemsDropped[i].id = '';
          // dialog box for nested list
          if (this.itemsDropped[i].type === 'nestedListInput') {
            const dialogRef = this.dialog.open(DsListDialogComponent, {
              height: '184px',
              width: '300px',
              data: {parentId: this.parentId}
            });
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                const res = result;

                this.fillFormObject(i, res.id);
                this.addFormObject(i);

              } else {
                // delete nested list if cancel
                this.itemsDropped.splice(i, 1);
              }
            });
            // end dialog box for nested list
          } else {

            this.fillFormObject(i, '');
            this.addFormObject(i);
          }
        }
        // end loop for looking for index of new inserted item
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (this.editMode) {
        if (this.itemsDropped.length > 0) {
      this.selectItem(this.itemsDropped[this.itemsDropped.length - 1]);
        }
      }
    });
    // dragula event for changing the index item
    this.dragulaService.dragend.subscribe(() => {
      this.changeIndex();
    });

    setTimeout(() => {
      const scroll = autoScroll([
        this.autoscroll.nativeElement
        // this.autoscroll.nativeElement,
        // this.autoscroll2.nativeElement
      ], {
        margin: 100,
        maxSpeed: 25,
        scrollWhenOutside: true,
        autoScroll: function(){
          // Only scroll when the pointer is down.
          return this.down;
          // return true;
        }
      });
    }, 0);
  }

  fillFormObject(index, id) {
    this.formObject = {
      dataStructureFieldSpecification: id,
      description: this.itemsDropped[index].description,
      label: this.itemsDropped[index].name,
      name: this.itemsDropped[index].type,
      placeholder: this.itemsDropped[index].placeholder,
      required: true
    };
  }

  addFormObject(index) {
    this.addItemsub = this.dataTableService.insertFormObject(index, this.formObject)
      .subscribe((res) => {
        // saving id from dataBase for to be able to delete this object after add without refreshing the page
        this.itemsDropped[index] = res;
        this.selectItem(this.itemsDropped[index]);
        this.firebaseService.setLastAction();
      });
  }

  delete(id) {
    if (id) {
      this.dataTableService.deleteFormObject(id)
        .subscribe((res) => {
          const result = res;
          if (result.length > 1) { // for list if there are nested list
            for ( let i = 1; i < result.length; i++) {
              this.removeFromLocalArray(result[i].id);
            }
          }
          this.showDsItem = false
          this.firebaseService.setLastAction();
        });
    }
  }

  removeFromLocalArray(id) {
    for (let i = 0; i < this.itemsDropped.length; i++) {
      if (id === this.itemsDropped[i].id) {
        this.itemsDropped.splice(i, 1);
        break;
      }
    }
  }

  // get id of item we want to delete
  itemDelete(item) {
    if (this.editMode) {
      this.selectedItemId = item.id;
      this.delete(item.id);
      this.removeFromLocalArray(item.id);
    }
  }

   itemMoved(item) {
     this.selectedItemId = item.id;
   }

  selectItem(item) {
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
    if (this.addItemsub) {
     this.addItemsub.unsubscribe();
    }
     if (this.dragulaDropSub) {
     this.dragulaDropSub.unsubscribe();
     }
   }

}
