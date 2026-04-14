import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Class {
  @Prop({ required: true })
  grade!: string;

  @Prop({ required: true })
  section!: string;

  @Prop({ required: true })
  className!: string;

  @Prop()
  classTeacher!: string;

  @Prop()
  numberOfStudents!: number;

  @Prop({ type: [String], default: [] })
  subjects!: string[];

  @Prop({ type: [String], default: [] })
  workingDays!: string[];

  @Prop()
  periodsPerDay!: number;

  @Prop()
  maxPeriodsPerDay!: number;

  @Prop()
  classroomId!: string;

  @Prop()
  classCapacity!: number;

  @Prop()
  schoolId!: string;

  @Prop({ default: 'ACTIVE' })
  status!: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);