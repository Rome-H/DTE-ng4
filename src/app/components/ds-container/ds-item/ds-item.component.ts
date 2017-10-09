import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';
import { DataTableService } from '../../../services/data-table/data-table.service';
import { FirebaseService } from '../../../services/firebase/firebase.service';


@Component({
  selector: 'q9-ds-item',
  templateUrl: './ds-item.component.html',
  styleUrls: ['./ds-item.component.scss'],
})
export class DsItemComponent implements OnInit, OnChanges {

  @Input() selectedItem: any;
  @Input() editMode: any;
  @Input() showDsItem: any;
  @Output() showDsItemEvent = new  EventEmitter<boolean>();

  optionOldText: any;
  item: any = [];
  parent: any = [];
  parentId: any;
  parentName: any;
  child: any = [];

  // TODO one way binding
  constructor(private dataTableService: DataTableService,
              private firebaseService: FirebaseService) {
  }
  ngOnInit() {
  }

  ngOnChanges() {
    this.item = Object.assign({}, this.selectedItem); // TODO test IE 11
    // if (this.item['additional']['min'] === null) {
    //   this.item['additional']['min'] = 'Min';
    // }
    // if (this.item.additional.max === null) {
    //   this.item.additional.max = 'Max';
    // }

    // if nested list, this loop get informatioin of parent list
    const data = this.dataTableService.dataTable.fields;
    for ( let i = 0 ; i < data.length; i++) {
      if (this.item.dataStructureFieldSpecification === data[i].id) {
        this.parent = data[i];
        this.parentName = data[i].name;
      }
    }
  }

  onEdit(val) {
    if (this.editMode) {
    if (val.target.name === 'name') {
      if (val.target.value.length >= 2 && val.target.value.length <= 20) {
        this.selectedItem.name = this.item.name;
        this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
          .subscribe( res => {
            this.firebaseService.setLastAction();
          }
          );
      } else {
        this.item.name = this.selectedItem.name;
      }
    }
    if (val.target.name === 'placeholder') {

      if (val.target.value.length >= 2 && val.target.value.length <= 100) {
        this.selectedItem.placeholder = val.target.value;
        this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
          .subscribe( res => {
            this.firebaseService.setLastAction();
          });
      } else {
        this.item.placeholder = this.selectedItem.placeholder;
      }
    }
    if (val.target.name === 'description') {
      if (val.target.value.length >= 2 && val.target.value.length <= 100) {
        this.selectedItem.description = val.target.value;
        this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
          .subscribe( res => {
            this.firebaseService.setLastAction();
          });
      } else {
        this.item.description = this.selectedItem.description;
      }
    }
      if (val.target.name === 'min') {
        this.selectedItem.additional.min = +(val.target.value);
        this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
          .subscribe(res => {
            this.firebaseService.setLastAction();
          });
      }
      if (val.target.name === 'max') {
        this.selectedItem.additional.max = +(val.target.value);
        this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
          .subscribe( res => {
            this.firebaseService.setLastAction();
          });
      }
      if (val.target.name === 'option') {
      if (val.target.value !== '') {
        const newOption = {
          value: val.target.value,
          parentOption: null
        };
        this.dataTableService.addListOption(this.selectedItem, newOption)
          .subscribe(res => {
            // to see immidiately a list of options
            this.selectedItem.options.push(res['newListOptions'][this.selectedItem.id]);
            val.target.value = '';
              this.firebaseService.setLastAction();
          });
      }
    }
      if (val.target.name === 'child-option') {
        if (val.target.value !== '') {
          const newOption = {
            value: val.target.value,
            parentOption: this.parentId
          };
          this.dataTableService.addListOption(this.selectedItem, newOption)
            .subscribe(res => {
              // update selected item options, to see on click added child options
              this.selectedItem.options.push(res['newListOptions'][this.selectedItem.id]);
              // to see immidiately a list of child options
              this.child.push(res['newListOptions'][this.selectedItem.id]);
              val.target.value = '';
              this.firebaseService.setLastAction();
            });
        }
      }
  }
  }
 // for checkbox
  toggle(val) {
    this.selectedItem.required = val;
    this.dataTableService.updateFormObject(this.selectedItem.id, this.selectedItem)
      .subscribe( res => {
        this.firebaseService.setLastAction();
      });
  }

  // need it if an error occurs when option update
  saveOldText(item) {
    this.optionOldText = item.value;
  }

  deleteOption(item) {
    let index = 0;
    for (let i = 0; i < this.selectedItem.options.length; i++) {
      if (item.id === this.selectedItem.options[i].id) {
        index = i;
      }
    }
    if (this.selectedItem.options.length > 1) {
      this.dataTableService.removeListOption(this.selectedItem, item.id)
        .subscribe(res => {
          this.selectedItem.options.splice(index, 1);
          this.updateChildOptions();
            this.firebaseService.setLastAction();
        });
    } else {
      console.log(`Can't delete last option`);
    }
  }

  updateOption(item) {
    if (this.optionOldText !== item.value && item.value !== '') {
    this.dataTableService.updateListOption(this.selectedItem, item)
      .subscribe(res => {
        this.firebaseService.setLastAction();
      });
    } else {
      item.value = this.optionOldText;
    }
  }

  // show child options on click
  childOptions(par) {
    this.parentId = par.id;
    this.child = [];
   for (let i = 0 ; i < this.item.options.length; i++ ) {
     if (this.item.options[i].dataStructureFieldValueSpecification === par.id) {
       this.child.push(this.item.options[i]);
     }
   }
  }

  // TODO tell that we need update child , we get child option from list by id of parent option
  updateChildOptions() {
    this.child = [];
    for (let i = 0 ; i < this.item.options.length; i++ ) {
      if (this.item.options[i].dataStructureFieldValueSpecification === this.parentId) {
        this.child.push(this.item.options[i]);
      }
    }
  }

  hide() {
    this.showDsItem = false;
    this.showDsItemEvent.emit(this.showDsItem);
  }
}
