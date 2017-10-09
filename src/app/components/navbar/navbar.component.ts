import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { DataTableService } from '../../services/data-table/data-table.service';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'q9-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  btnText: any;
  editMode: any;
  dtName: any;
  teamNameWithDomain: any;
  dT: any;

  constructor(private router: Router,
              private dataTableService: DataTableService,
              private firebaseService: FirebaseService,
              private userService: UserService) {
// check if state is view or edit
    this.dataTableService.editMode()
      .subscribe((res) => {
        this.editMode = res;
        this.setBtnText(); // TODO: tell that it works correct only in constructur
      });
  }

  ngOnInit() {
    this.dT = this.dataTableService.dataTable;
    this.dtName = this.dT.name;
    this.teamNameWithDomain = `${this.dT.sessionUser.userInTeam.organization.name} [${this.dT.user.enterprise.domain}]`;
  }

  setBtnText() {
    // check state and set the button
    this.editMode === true ? this.btnText = 'VIEW' : this.btnText = 'EDIT';
  }

  changeMode() {
    // Set button mode
    if (!this.editMode) {
      this.router.navigate([`../${this.dataTableService.id}/edit`]);
      this.setBtnText();
      this.dataTableService.edit = true;
    } else {
      this.firebaseService.removeDSLock(this.userService.user);
      this.router.navigate([`../${this.dataTableService.id}`]);
      this.setBtnText();
      this.dataTableService.edit = false;
    }
  }
}
