import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserFormType } from './user.schema';

@Controller('records')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async addUser(@Body() user: UserFormType) {
    const res = await this.usersService.addUser(user);
    return res;
  }

  @Get()
  async getUsers() {
    const res = await this.usersService.getUsers();
    console.log(res);
    return res;
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() user: UserFormType) {
    await this.usersService.updateUser(userId, user);
    return null;
  }
}
