import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

export type TimetableDocument = Timetable & Document;

@Schema({ versionKey: false, timestamps: true })
export class Timetable extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    schedulaId!: string;

    @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
    classId!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'TimetableFormat', required: true })
    formatId!: Types.ObjectId;

    @Prop({ enum: ['DRAFT', 'ACTIVE'], default: 'DRAFT' })
    status!: 'DRAFT' | 'ACTIVE';
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);

TimetableSchema.index({ schedulaId: 1, classId: 1, status: 1 });