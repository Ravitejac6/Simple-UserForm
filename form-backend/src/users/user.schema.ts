import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = UserType & Document;

@Schema()
export class UserType {
  // @Prop()
  // firstName: string;
  // @Prop()
  // email: string;
  // @Prop()
  // gender: string;
  // @Prop()
  // mobileNumber: string;
  // @Prop()
  // image: string;
  // @Prop()
  // c: boolean;
  // @Prop()
  // c_plus: boolean;
  // @Prop()
  // python: boolean;
}

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
