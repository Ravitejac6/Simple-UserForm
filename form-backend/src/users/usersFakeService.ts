import { UserDocument, UserFormType, UserType } from './user.schema';

// FakeUserService is used for testing purpose in the UserController.spec.ts
export const users: UserType[] = [
  {
    firstName: 'abc',
    email: 'abc@gmail.com',
    gender: 'male',
    mobileNumber: '123456789',
    image: 'xyz.jpg',
    c: true,
    c_plus: true,
    python: false,
  },
  {
    firstName: 'def',
    email: 'def@gmail.com',
    gender: 'male',
    mobileNumber: '564312789',
    image: 'def.jpg',
    c: false,
    c_plus: true,
    python: false,
  },
  {
    firstName: 'pqr',
    email: 'pqr@gmail.com',
    gender: 'female',
    mobileNumber: '9861335478',
    image: 'pqr.png',
    c: true,
    c_plus: false,
    python: false,
  },
];

export class UsersFakeService {
  user: UserFormType = {
    firstName: 'pqr',
    email: 'pqr@gmail.com',
    gender: 'female',
    mobileNumber: '9861335478',
    image: 'pqr.png',
    c: true,
    c_plus: false,
    python: false,
  };
  addUsers(user: UserFormType) {
    return user.email;
  }
  getUsers() {
    return users;
  }

  findUser(userEmail: string) {
    return this.user;
  }

  deleteUser(userEmail: string) {
    return 1;
  }
}
