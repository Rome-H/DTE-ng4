import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'q9-ds-item',
  templateUrl: './ds-item.component.html',
  styleUrls: ['./ds-item.component.css']
})
export class DsItemComponent implements OnInit {

  @Input() name: string;
  constructor() { }

  ngOnInit() {
  }

}
