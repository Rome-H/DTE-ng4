import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'q9-ds-container',
  templateUrl: './ds-container.component.html',
  styleUrls: ['./ds-container.component.css']
})
export class DsContainerComponent implements OnInit {

  editMode: any;

  constructor(private router: Router) {
    // call router state
   this.routerState();

  }

  ngOnInit() {}

  routerState() {
    this.router.events.subscribe((val) => {
      const sub = val['url'];
      if (sub.indexOf('edit') !== -1) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    });
  }
}
