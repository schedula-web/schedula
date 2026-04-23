import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';
import { Document } from 'mongoose';

export type SubjectDocument = Subject & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Subject extends BaseSchema {
  @Prop({ required: true, index: true })
  schedulaId!: string;

  @Prop({ required: true, trim: true })
  subjectName!: string;

  @Prop({ required: true, min: 1 })
  periodsPerWeek!: number;

  @Prop({ required: true, min: 1 })
  maxPeriodsPerDay!: number;

  @Prop({ required: true, min: 1 })
  applicableGrade!: number;

  @Prop()
  subjectCode?: string;

  @Prop()
  roomNumber?: number;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Teacher' }],
    default: [],
  })
  teacherIds?: Types.ObjectId[];


}

export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.index(
  { schedulaId: 1, subjectName: 1, applicableGrade: 1 },
  { unique: true },
);