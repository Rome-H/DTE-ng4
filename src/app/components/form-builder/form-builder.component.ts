import { Component, OnInit } from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'q9-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  public itemsToDrop: Array<Object> = [ // array of items to drag
    {name: 'Text'},
    {name: 'Long Text'},
    {name: 'Numbers'},
    {name: 'List'},
    {name: 'Nested List'},
    {name: 'Date'},
    {name: 'Time'},
    {name: 'Yes/No'}
  ]
  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('another-bag', {
      removeOnSpill: true, // remove div when dragged of the container
      copy: function (el, source) {  // copying the forms from form-builder
        return source.className.indexOf('can_move') !== -1;
      },
      accepts: function (el, source) {  // accepting form in container
        return source.className.indexOf('can_move') === -1;
      }
    });
  }
  ngOnInit() {
  }
}
