import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { BaseSchemaOptions } from '../../../core/database/base.schema';

@Schema(BaseSchemaOptions)
export class Teacher extends Document {
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
  availability?: {
    workingDays?: string[];
    startTime?: string;
    endTime?: string;
    maxPeriodsPerDay?: number;
    unavailablePeriods?: {
      date: string;
      periodLabels: string[];
      reason?: string;
    }[];
  };

  @Prop({ type: MongooseSchema.Types.Mixed })
  substitutionSettings?: {
    availableForSubstitution?: boolean;
    maxSubstitutionsPerWeek?: number;
    preferredSubjectIds?: string[];
    avoidConsecutiveSubstitutions?: boolean;
  };

  @Prop({ type: MongooseSchema.Types.Mixed })
  workloadRules?: {
    maxPeriodsPerWeek?: number;
    preferredFreePeriod?: string;
    allowExtraLoad?: boolean;
  };

  @Prop({ type: MongooseSchema.Types.Mixed })
  workload?: {
    dailyPeriods: number;
    weeklyPeriods: number;
    monthlyPeriods: number;
    maxAllowedPeriods: number;
    workloadStatus: string;
    substitutionCount: number;
  };
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);