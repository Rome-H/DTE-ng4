import { Component, OnInit } from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'q9-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  // array of items to drag
  public itemsToDrop: Array<Object> = [
    {name: 'Text'},
    {name: 'Long Text'},
    {name: 'Numbers'},
    {name: 'List'},
    {name: 'Nested List'},
    {name: 'Date'},
    {name: 'Time'},
    {name: 'Yes/No'}
  ];

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('form-builder-dnd', {
      // remove div when dragged off the container
      removeOnSpill: true,
      // copy the dragged items into drop model -
      // which prevents them from being removed from the left panel
      copy: function (el, source) {
        return source.className.indexOf('can_move') !== -1;
      },
      accepts: function (el, source) {
        return source.className.indexOf('can_move') === -1;
      }
    });
  }
  ngOnInit() {
  }
}
