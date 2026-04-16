import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchemaOptions } from '../../../core/database/base.schema';

@Schema(BaseSchemaOptions)
export class School {
  _id!: Types.ObjectId;

  @Prop({ required: true, trim: true, index: true })
  name!: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);