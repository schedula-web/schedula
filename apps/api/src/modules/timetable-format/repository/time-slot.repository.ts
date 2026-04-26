import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimeSlot, TimeSlotDocument } from '../schema/time-slot.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TimeSlotRepository {
    constructor(
        @InjectModel(TimeSlot.name)
        private model: Model<TimeSlotDocument>,
    ) { }

    create(data: Partial<TimeSlot>) {
        return this.model.create(data);
    }

    findByFormat(formatId: string) {
        // Explicitly cast to ObjectId to ensure the query matches the database type
        return this.model.find({ 
            formatId: new Types.ObjectId(formatId) 
        }).sort({ orderIndex: 1 });
    }

    deleteByFormat(formatId: string) {
        return this.model.deleteMany({ 
            formatId: new Types.ObjectId(formatId) 
        });
    }
}