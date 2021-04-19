import { Test, TestingModule } from '@nestjs/testing';
import { UserType, UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { UsersService } from './user.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('UsersService testing', () => {
  let usersService: UsersService;
  let mockUserModel: Model<UserDocument>;
  const user: UserType = {
    firstName: 'abc',
    email: 'abc@gmail.com',
    gender: 'male',
    mobileNumber: '123456789',
    image: 'xyz.jpg',
    c: true,
    c_plus: true,
    python: false,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://raviteja:vishnu123$@sample-cluster.dquap.mongodb.net/Usersdb?retryWrites=true&w=majority',
        ),
        MongooseModule.forFeature([{ name: 'records', schema: UserSchema }]),
      ],
      providers: [
        UsersService,
        {
          provide: getModelToken(UserType.name),
          useValue: Model,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    mockUserModel = moduleRef.get<Model<UserDocument>>(
      getModelToken(UserType.name),
    );
  });

  it('Service should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('find the user by userEmail', async () => {
    const mockUserModelFindByEmailSpy = jest
      .spyOn(mockUserModel, 'findOne')
      .mockImplementation(() => {
        return {
          exec: jest.fn().mockResolvedValue(user),
        } as any;
      });

    const foundUser = await usersService.findUser('abc@gmail.com');
    expect(mockUserModelFindByEmailSpy).toBeCalled();
    expect(mockUserModelFindByEmailSpy).toHaveBeenCalledWith({
      email: 'abc@gmail.com',
    });
    expect(foundUser).toBe(user);
  });

  it('Inserting a user returns a email', async () => {
    const mockUserModelSaveSpy = jest
      .spyOn(mockUserModel.prototype, 'save')
      .mockImplementation(() => Promise.resolve(user));
    const savedUserEmail = await usersService.addUser(user);
    expect(savedUserEmail).toBe('abc@gmail.com');
    expect(mockUserModelSaveSpy).toBeCalled();
    expect(mockUserModelSaveSpy).toBeCalledTimes(1);
  });

  it('Deleting a user', async () => {
    const mockUserDeleteByEmailSpy = jest
      .spyOn(mockUserModel, 'deleteOne')
      .mockImplementation(() => {
        return {
          exec: jest.fn().mockResolvedValue({
            deletedCount: 1,
          }),
        } as any;
      });

    const deletedUser = await usersService.deleteUser('abc@gmail.com');
    console.log(deletedUser);
    expect(deletedUser).toBeTruthy();
    expect(mockUserDeleteByEmailSpy).toBeCalled();
    expect(mockUserDeleteByEmailSpy).toHaveBeenCalledWith({
      email: 'abc@gmail.com',
    });
  });

  it('Get users returns an array of Users', async () => {
    const users: UserType[] = [
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

    const mockUserModelFindSpy = jest
      .spyOn(mockUserModel, 'find')
      .mockImplementation(() => {
        return {
          exec: jest.fn().mockResolvedValue(users),
        } as any;
      });

    const allUsers = await usersService.getUsers();
    expect(allUsers).toBe(users);
    expect(mockUserModelFindSpy).toBeCalledTimes(1);
  });
});
