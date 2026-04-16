import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, Types } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

@Schema() // ✅ no BaseSchemaOptions here
export class Teacher extends BaseSchema { // ✅ extend instead
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'School', index: true, required: true })
  schoolId!: Types.ObjectId;

  @Prop({ required: true, index: true, trim: true })
  fullName!: string;

  @Prop({ required: true, unique: true, index: true, lowercase: true, trim: true })
  email!: string;

  @Prop()
  phoneNumber?: string;

  @Prop({ index: true })
  employeeId?: string;

  @Prop()
  joiningDate?: Date;

  @Prop()
  employmentType?: string;

  @Prop()
  experienceYears?: number;

  @Prop({ default: 'active' })
  status?: string;

  @Prop()
  notes?: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Subject' }] })
  subjectIds?: Types.ObjectId[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  availability?: any;

  @Prop({ type: MongooseSchema.Types.Mixed })
  substitutionSettings?: any;

  @Prop({ type: MongooseSchema.Types.Mixed })
  workloadRules?: any;

  @Prop({ type: MongooseSchema.Types.Mixed })
  workload?: any;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);