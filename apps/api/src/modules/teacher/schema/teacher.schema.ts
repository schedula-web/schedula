import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

export type TeacherDocument = Teacher & Document;

@Schema({ _id: false })
class Availability {
  @Prop({ type: [String], required: true })
  workingDays!: string[];

  @Prop({ required: true })
  startTime!: string;

  @Prop({ required: true })
  endTime!: string;

  @Prop({ required: true })
  maxPeriodsPerDay!: number;

  @Prop({ type: [Number], default: [] })
  unavailablePeriods?: number[];
}

@Schema({ _id: false })
class SubstitutionSettings {
  @Prop({ default: true })
  availableForSubstitution!: boolean;

  @Prop({ default: 0 })
  maxSubstitutionsPerWeek!: number;

  @Prop({ type: [Types.ObjectId], default: [] })
  preferredSubjectIds?: Types.ObjectId[];

  @Prop({ default: false })
  avoidConsecutiveSubstitutions!: boolean;
}

@Schema({ _id: false })
class WorkloadRules {
  @Prop({ required: true })
  maxPeriodsPerWeek!: number;

  @Prop()
  preferredFreePeriod?: string;

  @Prop({ default: false })
  allowExtraLoad!: boolean;
}

@Schema({ collection: 'teachers', versionKey: false })
export class Teacher extends BaseSchema {

  @Prop({ required: true, index: true })
  schedulaId!: string;

  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true })
  email!: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
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

  @Prop({ type: Availability })
  availability?: Availability;

  @Prop({ type: SubstitutionSettings })
  substitutionSettings?: SubstitutionSettings;

  @Prop({ type: WorkloadRules })
  workloadRules?: WorkloadRules;

  @Prop({ type: [Types.ObjectId], default: [] })
  subjectIds?: Types.ObjectId[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);

// Multi-tenant uniqueness
TeacherSchema.index({ email: 1, schedulaId: 1 }, { unique: true });