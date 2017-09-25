import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';
import { DataTableService } from '../../../services/data-table/data-table.service';

@Component({
  selector: 'q9-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  // array of items to drag
  public itemsToDrop: Array<Object> = [
    {'type' : 'textInput' , 'name' : 'Text' , 'placeholder' : 'Enter text for text field' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'longTextInput' , 'name' : 'Long Text' , 'placeholder' : 'Long text' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'numInput' , 'name' : 'Number' , 'placeholder' : 'Enter value' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'listInput' , 'name' : 'List' , 'placeholder' : 'Choose list items' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'nestedListInput' , 'name' : 'Nested List' , 'placeholder' : 'Choose list items' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'dateInput' , 'name' : 'Date' , 'placeholder' : 'DD MM YYY' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'timeInput' , 'name' : 'Time' , 'placeholder' : 'HH : MM' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'yesNoInput' , 'name' : 'Yes/No' , 'placeholder' : 'Enter value' , 'description' : 'Description displayed below field' , 'id' : 'new'}
  ];

  editMode = false;
  constructor( private dragulaService: DragulaService,
               private dataTableService: DataTableService) {
    this.dataTableService.editMode()
    .subscribe((res) => {
      this.editMode = res;
       this.move();
      console.log(123, this.editMode);
    });
    console.log(19);
    this.editMode = this.dataTableService.edit;
    this.dragulaService.setOptions('form-builder-dnd', {
      // remove div when dragged off the container
      removeOnSpill: true,
      // copy the dragged items into drop model -
      // which prevents them from being removed from the left panel
      copy: function (el, source) {
        return source.className.indexOf('can_move') !== -1;
      },
      moves: (el, source, handle, sibling) => !el.classList.contains('no-drag'),
      accepts: function (el, source) {
        return source.className.indexOf('can_move') === -1;
      }
    });
  }

  ngOnInit() {

  }
  move() {

  }
}
