import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserType & Document;

@Schema()
export class UserType {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  gender: string;
  @Prop({ required: true })
  mobileNumber: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  c: boolean;
  @Prop({ required: true })
  c_plus: boolean;
  @Prop({ required: true })
  python: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserType);

export interface UserFormType {
  firstName: string;
  email: string;
  mobileNumber: string;
  gender: string;
  image: string;
  c: boolean;
  c_plus: boolean;
  python: boolean;
}
