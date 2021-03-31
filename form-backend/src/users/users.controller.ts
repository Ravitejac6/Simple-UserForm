import {
  Body,
  Controller,
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
    const res = await this.usersService.getUsers();
    console.log(res);
    return res;
  }

  @Patch(':id')
  async updateUser(@Param('id') userId: string, @Body() user: UserFormType) {
    await this.usersService.updateUser(userId, user);
    return null;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadFile(@UploadedFile() file) {
    console.log(file.filename);
    //await this.usersService.uploadFile(file.filename);
    return file.filename;
  }

  @Get(':imagePath')
  findImage(@Param('imagePath') imgPath: string, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/' + imgPath));
  }
}
