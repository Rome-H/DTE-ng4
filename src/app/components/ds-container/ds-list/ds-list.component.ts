import { Component, OnInit } from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.css']
})
export class DsListComponent implements OnInit {
  public itemsDropped: Array<any> = [];
  drag = false;

  constructor() {
  }

  ngOnInit() {
  }
  public addDropItem(event) {
    this.itemsDropped.push(event);
  }

  public dragging(event) {
    this.drag = true;
    console.log(this.drag);
  }
}
