import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
