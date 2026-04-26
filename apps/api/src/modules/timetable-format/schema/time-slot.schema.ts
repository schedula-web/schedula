import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

export type TimeSlotDocument = TimeSlot & Document;

@Schema({ versionKey: false, timestamps: true })
export class TimeSlot extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    schedulaId!: string;

    @Prop({ type: Types.ObjectId, ref: 'TimetableFormat', required: true, index: true })
    formatId!: Types.ObjectId;

    @Prop({ enum: ['PERIOD', 'BREAK'], required: true })
    slotType!: 'PERIOD' | 'BREAK';

    @Prop()
    periodLabel?: string;

    @Prop({ required: true })
    startTime!: string;

    @Prop({ required: true })
    endTime!: string;

    @Prop({ required: true })
    orderIndex!: number;
}

export const TimeSlotSchema = SchemaFactory.createForClass(TimeSlot);

TimeSlotSchema.index({ schedulaId: 1, formatId: 1, orderIndex: 1 }, { unique: true });