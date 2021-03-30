import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserFormType } from './user.schema';

@Controller('records')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() user: UserFormType) {
    const res = this.usersService.addUser(user);
    console.log(res);
    return res;
  }

  @Get()
  getUsers() {
    const res = this.usersService.getUsers();
    console.log(res);
    return res;
  }
}
