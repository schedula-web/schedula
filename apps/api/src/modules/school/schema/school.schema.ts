import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

@Schema()
export class School extends BaseSchema {
  @Prop({ required: true, trim: true, index: true })
  name!: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);