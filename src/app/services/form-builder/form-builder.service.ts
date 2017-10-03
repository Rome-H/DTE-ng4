import { Injectable } from '@angular/core';

@Injectable()
export class FormBuilderService {

  public itemsToDrop: Array<Object> = [
    {'type' : 'textInput' , 'name' : 'Text' , 'placeholder' : 'Enter text for text field' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'longTextInput' , 'name' : 'Long Text' , 'placeholder' : 'Long text' , 'description' : 'Long text' , 'id' : 'new'},
    {'type' : 'numInput' , 'name' : 'Numbers' , 'placeholder' : 'Enter value' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'listInput' , 'name' : 'List' , 'placeholder' : 'Choose list items' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'nestedListInput' , 'name' : 'Nested List' , 'placeholder' : 'Choose list items' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'dateInput' , 'name' : 'Date' , 'placeholder' : 'DD MM YYY' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'timeInput' , 'name' : 'Time' , 'placeholder' : 'HH : MM' , 'description' : 'Description displayed below field' , 'id' : 'new'},
    {'type' : 'yesNoInput' , 'name' : 'Yes/No' , 'placeholder' : 'Enter value' , 'description' : 'Description displayed below field' , 'id' : 'new'}
  ];
  constructor() { }
}
