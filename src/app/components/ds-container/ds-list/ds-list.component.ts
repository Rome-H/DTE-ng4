import { Component, OnInit } from '@angular/core';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'q9-ds-list',
  templateUrl: './ds-list.component.html',
  styleUrls: ['./ds-list.component.css']
})
export class DsListComponent implements OnInit {
  // array of our dropped items
  public itemsDropped: Array<any> = [];
  constructor() {
  }

  ngOnInit() {
  }
}
