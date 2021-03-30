import { Injectable } from '@nestjs/common';
import { UserFormType } from './user.schema';

@Injectable()
export class UsersService {
  constructor() {}
  allUsersArr: UserFormType[] = [];
  addUser(user: UserFormType) {
    this.allUsersArr.push(user);
    return user;
  }

  getUsers() {
    return this.allUsersArr;
  }
}
