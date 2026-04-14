import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Timetable {
  @Prop({ required: true })
  classId!: string;   // ✅ FIXED

  @Prop({ type: [Object], default: [] })
  schedule!: any[];   // ✅ FIXED
}

export const TimetableSchema = SchemaFactory.createForClass(Timetable);