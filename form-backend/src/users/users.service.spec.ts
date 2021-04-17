import { Test, TestingModule } from '@nestjs/testing';
import { UserType, UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { UsersService } from './user.service';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

describe('Users Controller', () => {
  let usersService: UsersService;
  let mockUserModel: Model<UserDocument>;

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

    const mockUserModelFindByEmailSpy = jest
      .spyOn(mockUserModel, 'findOne')
      .mockImplementation(() => {
        return {
          exec: jest.fn().mockResolvedValue(user),
        } as any;
      });

    const foundUser = await usersService.findUser('abc@gmail.com');
    console.log(foundUser);
    expect(mockUserModelFindByEmailSpy).toBeCalled();
    expect(foundUser).toBe(user);
  });
});
