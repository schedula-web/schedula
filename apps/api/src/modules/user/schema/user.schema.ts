import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

@Schema()
export class User extends BaseSchema {
  @Prop({ required: true, index: true, trim: true })
  schoolName!: string;

  @Prop({ required: true, unique: true, index: true, trim: true })
  schoolCode!: string;

  @Prop({ required: true, trim: true })
  boardType!: string;

  @Prop({ required: true, trim: true })
  phoneNumber!: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email!: string;

  @Prop({ required: true, trim: true })
  principalName!: string;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop({ unique: true, trim: true })
  schedulaId!: string;  // Keep as schedulaId as you want
}

export const UserSchema = SchemaFactory.createForClass(User);