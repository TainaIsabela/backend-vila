import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  cpf: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: false,
  })
  profilePicture: string;

  @Prop({
    required: false,
  })
  bio: string;

  @Prop({
    required: false,
  })
  tokenVersion: number;

  @Prop({
    required: false,
  })
  isActive: boolean;
}
export const UserSchema = SchemaFactory.createForClass(User);
module.exports = { User, UserSchema };
