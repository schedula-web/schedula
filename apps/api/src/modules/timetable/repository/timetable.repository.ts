import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Timetable, TimetableDocument } from '../schema/timetable.schema';
import { Model } from 'mongoose';

@Injectable()
export class TimetableRepository {
    constructor(
        @InjectModel(Timetable.name)
        private model: Model<TimetableDocument>,
    ) { }

    create(data: Partial<Timetable>) {
        return this.model.create(data);
    }

    findAll(schedulaId: string) {
        return this.model.find({ schedulaId }).populate('classId formatId');
    }

    findById(id: string) {
        return this.model.findById(id).populate('classId formatId');
    }

    update(id: string, data: Partial<Timetable>) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).lean().exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
