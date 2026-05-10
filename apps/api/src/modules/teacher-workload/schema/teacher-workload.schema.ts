import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

export type TeacherWorkloadDocument = TeacherWorkload & Document;

@Schema({ versionKey: false, timestamps: true })
export class TeacherWorkload extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    schedulaId!: string;

    @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true, index: true })
    teacherId!: Types.ObjectId;

    @Prop({ default: 0 })
    dailyPeriods!: number;

    @Prop({ default: 0 })
    weeklyPeriods!: number;

    @Prop({ default: 0 })
    monthlyPeriods!: number;

    @Prop({ default: 0 })
    maxAllowedPeriods!: number;

    @Prop({ default: 'NORMAL' })
    workloadStatus!: string;

    @Prop({ default: 0 })
    substitutionCount!: number;
}

export const TeacherWorkloadSchema = SchemaFactory.createForClass(TeacherWorkload);

TeacherWorkloadSchema.index({ schedulaId: 1, teacherId: 1 }, { unique: true });
