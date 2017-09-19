export interface User { // TODO - check whether 'interface' should ne implemented
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  userInTeam?: any;
}
