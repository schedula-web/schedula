import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { BaseSchema } from '../../../core/database/base.schema';
import { SubstitutionStatus } from '../../../core/constants/enums';

export type SubstitutionDocument = Substitution & Document;

@Schema({ versionKey: false, timestamps: true })
export class Substitution extends BaseSchema {
    @Prop({ type: String, required: true, index: true })
    schedulaId!: string;

    @Prop({ required: true })
    date!: Date;

    @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
    classId!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'TimeSlot', required: true })
    timeSlotId!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Subject', required: true })
    subjectId!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Teacher', required: true })
    absentTeacherId!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Teacher' })
    substituteTeacherId?: Types.ObjectId;

    @Prop({ enum: SubstitutionStatus, default: SubstitutionStatus.PENDING })
    status!: SubstitutionStatus;
}


export const SubstitutionSchema = SchemaFactory.createForClass(Substitution);

SubstitutionSchema.index({ schedulaId: 1, date: 1, classId: 1, timeSlotId: 1 });
