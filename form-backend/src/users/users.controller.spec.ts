import { Test, TestingModule } from '@nestjs/testing';
import { UserType, UserDocument, UserSchema } from './user.schema';
import { Model } from 'mongoose';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { UsersFakeService } from './usersFakeService';

describe('Users Controller', () => {
  let usersService: UsersService;
  let usersController: UsersController;
  let mockUserModel: Model<UserDocument>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb+srv://raviteja:vishnu123$@sample-cluster.dquap.mongodb.net/Usersdb?retryWrites=true&w=majority',
        ),
        MongooseModule.forFeature([{ name: 'records', schema: UserSchema }]),
      ],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: UsersFakeService,
        },
        {
          provide: getModelToken(UserType.name),
          useValue: Model,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    mockUserModel = moduleRef.get<Model<UserDocument>>(
      getModelToken(UserType.name),
    );
  });

  describe('User controller test cases', () => {
    it('Users controller defined', async () => {
      expect(usersController).toBeDefined();
    });

    it('getUsers in usersService', async () => {
      usersController.getUsers();
      expect(usersService.getUsers).toHaveBeenCalled();
    });
  });
});
