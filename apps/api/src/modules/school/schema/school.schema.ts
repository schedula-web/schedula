import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class School {
  _id!: Types.ObjectId;

  @Prop({ required: true, trim: true, index: true })
  name!: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);