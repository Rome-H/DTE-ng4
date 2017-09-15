import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { DataTableService } from '../../services/data-table/data-table.service';

@Component({
  selector: 'q9-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  btnText: any;
  id: any;
  editMode: any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataTableService: DataTableService) {
    // check if state is view or edit
    dataTableService.editMode()
      .subscribe((res) => {
      this.editMode = res;
      this.isEditMode(); // TODO: tell that it works correct only in constructur
    });
}

  ngOnInit() {
    // Getting id for absolute path
    this.route.params.subscribe(segments => this.id = segments.id);
  }

  isEditMode() {
    // check state and set the button
    this.editMode === true ? this.btnText = 'View' : this.btnText = 'Edit';
  }

  changeMode() {
    // Set button mode ok
    if (!this.editMode) {
      this.router.navigate([`../${this.id}/edit`]);
      this.isEditMode();
    } else {
      this.router.navigate([`../${this.id}`]);
      this.isEditMode();
    }
  }
}
