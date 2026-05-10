import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

export type TimetableEntryDocument = TimetableEntry & Document;

@Schema({ versionKey: false, timestamps: true })
export class TimetableEntry extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    schedulaId!: string;

    @Prop({ type: Types.ObjectId, ref: 'Timetable', required: true })
    timetableId!: Types.ObjectId;

    @Prop({ enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'], required: true })
    dayOfWeek!: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

    @Prop({ type: Types.ObjectId, ref: 'TimeSlot', required: true })
    timeSlotId!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject' })
    subjectId!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Teacher' })
    teacherId!: Types.ObjectId;
}

export const TimetableEntrySchema = SchemaFactory.createForClass(TimetableEntry);

/**
 * Prevent duplicate slot assignment
 */
TimetableEntrySchema.index(
    { timetableId: 1, dayOfWeek: 1, timeSlotId: 1 },
    { unique: true },
);

/**
 * Teacher clash detection
 */
TimetableEntrySchema.index({
    schedulaId: 1,
    teacherId: 1,
    dayOfWeek: 1,
    timeSlotId: 1,
});