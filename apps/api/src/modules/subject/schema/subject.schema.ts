import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

@Schema()
export class Subject extends BaseSchema {
  @Prop({ required: true, trim: true })
  name!: string;

  @Prop({ required: true, trim: true, unique: true })
  code!: string;

  @Prop({ trim: true })
  description?: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
