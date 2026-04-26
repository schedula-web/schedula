import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';

export type TimetableFormatDocument = TimetableFormat & Document;

@Schema({ versionKey: false, timestamps: true })
export class TimetableFormat extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    schedulaId!: string;

    @Prop({ required: true })
    name!: string;
}

export const TimetableFormatSchema = SchemaFactory.createForClass(TimetableFormat);

TimetableFormatSchema.index({ schedulaId: 1, name: 1 }, { unique: true });