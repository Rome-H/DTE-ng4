import { Injectable } from '@angular/core';
import { User } from '../../models/user/user.model';


@Injectable()
export class UserService {

  user: User = {};
  constructor() { }

  createUser(user: any) {

      this.user._id = user.id;
      this.user.email = user.email,
      this.user.firstName = user.firstName,
      this.user.lastName = user.lastName,
      this.user.createdAt = user.createdAt,
      this.user.userInTeam = user.userInTeam

      console.log('user:', this.user);
  }
}
