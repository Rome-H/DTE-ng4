import { Component, OnInit } from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'q9-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  public itemsToDrop: Array<Object> = [
    {name: 'Text'},
    {name: 'Long Text'},
    {name: 'Numbers'},
    {name: 'List'},
    {name: 'Nested List'},
    {name: 'Date'},
    {name: 'Time'},
    {name: 'Yes/No'}
  ]
  constructor() {}
  ngOnInit() {
  }
}
