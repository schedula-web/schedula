import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';
import { ClassStatus, WorkingDay } from '../../../core/constants/enums';

export type ClassDocument = Class & Document;

@Schema() // ✅ no collection, no timestamps, no versionKey (handled in BaseSchema)
export class Class extends BaseSchema {

  @Prop({ required: true, index: true })
  schedulaId!: string;

  @Prop({ required: true })
  grade!: number;

  @Prop({ required: true, trim: true, uppercase: true })
  section!: string;

  @Prop({ required: true, trim: true })
  className!: string;

  @Prop({ type: Types.ObjectId, ref: 'Teacher' })
  classTeacherId?: Types.ObjectId;

  @Prop({ default: 0 })
  numberOfStudents?: number;

  @Prop({ type: [Types.ObjectId], ref: 'Subject', default: [] })
  subjectIds?: Types.ObjectId[];

  @Prop({
    type: [String],
    enum: WorkingDay,
    required: true,
  })
  workingDays!: WorkingDay[];

  @Prop({ required: true })
  periodsPerDay!: number;

  @Prop({ required: true })
  maxPeriodsPerDay!: number;

  @Prop()
  classroomId?: string;

  @Prop()
  classCapacity?: number;

  @Prop({
    enum: ClassStatus,
    default: ClassStatus.ACTIVE,
  })
  status?: ClassStatus;
}

export const ClassSchema = SchemaFactory.createForClass(Class);

// ✅ Multi-tenant unique constraint
ClassSchema.index(
  { schedulaId: 1, grade: 1, section: 1 },
  { unique: true },
);