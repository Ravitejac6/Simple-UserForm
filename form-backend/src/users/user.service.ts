import { Injectable, NotFoundException } from '@nestjs/common';
import { UserFormType, UserDocument } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('records') private readonly userModel: Model<UserDocument>,
  ) {}

  imageFilePath: string;

  async addUser(user: UserFormType): Promise<String> {
    const newUser = new this.userModel({
      firstName: user.firstName,
      gender: user.gender,
      email: user.email,
      mobileNumber: user.mobileNumber,
      image: user.image,
      c: user.c,
      c_plus: user.c_plus,
      python: user.python,
    });
    const res = await newUser.save();
    return res.email;
  }

  async getUsers(): Promise<UserFormType[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async updateUser(userEmail: string, user: UserFormType) {
    const updatedUser = await this.findUser(userEmail);
    if (user.firstName) updatedUser.firstName = user.firstName;
    if (user.gender) updatedUser.gender = user.gender;
    if (user.mobileNumber) updatedUser.mobileNumber = user.mobileNumber;
    if (user.email) updatedUser.email = user.email;
    if (user.image) updatedUser.image = user.image;
    if (user.c) updatedUser.c = user.c;
    if (user.c_plus) updatedUser.c_plus = user.c_plus;
    if (user.python) updatedUser.python = user.python;
    updatedUser.save();
    console.log(updatedUser);
    return updatedUser;
  }

  async findUser(userEmail: string): Promise<UserDocument> {
    let user;
    try {
      user = await this.userModel.findOne({ email: userEmail }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find the record');
    }
    if (!user) throw new NotFoundException('Could not find record');
    return user;
  }

  async deleteUser(userEmail: string) {
    const res = await this.userModel.deleteOne({ email: userEmail }).exec();
    if (res.n === 0) {
      throw new NotFoundException('Could not find record');
    }
  }
}
