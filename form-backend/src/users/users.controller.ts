import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { UserFormType } from './user.schema';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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
    const users = await this.usersService.getUsers();
    console.log(users);
    return users;
  }

  @Patch(':email')
  async updateUser(
    @Param('email') userEmail: string,
    @Body() user: UserFormType,
  ) {
    await this.usersService.updateUser(userEmail, user);
    return null;
  }

  @Delete(':email')
  async deleteUser(@Param('email') userEmail: string) {
    console.log(userEmail);
    await this.usersService.deleteUser(userEmail);
    return null;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Res() res) {
    console.log(file.filename);
    return res.send({ file: file.filename });
  }

  @Get('getFile/:filename')
  findImage(@Param('filename') imgPath: string, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/' + imgPath));
  }
}
