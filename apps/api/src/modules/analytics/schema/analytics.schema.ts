import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

export type AnalyticsDocument = Analytics & Document;

@Schema({ versionKey: false, timestamps: true })
export class Analytics extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    schedulaId!: string;

    @Prop({ default: 0 })
    timetableEfficiency!: number;

    @Prop({ default: 0 })
    teacherUtilization!: number;

    @Prop({ default: 0 })
    substitutionEvents!: number;

    @Prop({ default: 0 })
    subjectsCovered!: number;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);

AnalyticsSchema.index({ schedulaId: 1 }, { unique: true });
