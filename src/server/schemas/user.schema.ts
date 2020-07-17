import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  regDate: Date;

  @Prop()
  isConfirmed: boolean;

  @Prop()
  lastLoginTime: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
