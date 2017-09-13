import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';

@Component({
  selector: 'q9-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  btnText: any;
  id: any;
  state: any;
  constructor(private router: Router,
              private route: ActivatedRoute) {
    // Getting id for absolute path
    const url = route.params.subscribe(segments => this.id = segments.id);

  }

  ngOnInit() {
  this.setButton();
  }

  setButton() {
    // Take the state of button after first load of page
    const state = this.router.routerState.snapshot.url;
    if (state.indexOf('edit') !== -1) {
      this.btnText = 'View';
    } else {
      this.btnText = 'Edit';
    }
  }

  isEditState() {
    // return state.indexOf('edit');
  }
  changeMode() {
    // Set button mode
    if (this.btnText === 'Edit') {
      this.router.navigate([`../${this.id}/edit`]);
      this.btnText = 'View';
    } else {
      this.router.navigate([`../${this.id}`]);
      this.btnText = 'Edit';
    }
  }
}
