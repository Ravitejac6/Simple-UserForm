import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './user.service';
import { UsersFakeService } from './usersFakeService';
import { users, user } from './usersFakeService';
import { UserFormType } from './user.schema';

describe('Users Controller', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          //   useValue: {
          //     getUsers: jest.fn(),
          //   },
          useClass: UsersFakeService,
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  it('controller should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('GET request called then return all the users', async () => {
    const res = await usersController.getUsers();
    expect(res).toEqual(users);
  });

  it('DELETE user request returns the null value', async () => {
    const res = await usersController.deleteUser('abc@gmail.com');
    expect(res).toBe(null);
  });

  it('UPDATE request returns a updated user', async () => {
    const updatedUser: UserFormType = {
      firstName: 'pqr',
      email: 'pqr@gmail.com',
      gender: 'female',
      mobileNumber: '9861335478',
      image: 'pqr.png',
      c: true,
      c_plus: true,
      python: true,
    };
    const res = await usersController.updateUser('abc@gmail.com', user);
    expect(res).toEqual(updatedUser);
  });
});
