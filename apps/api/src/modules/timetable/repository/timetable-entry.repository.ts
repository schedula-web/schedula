import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimetableEntry, TimetableEntryDocument } from '../schema/timetable-entry.schema';
import { Model } from 'mongoose';

@Injectable()
export class TimetableEntryRepository {
    constructor(
        @InjectModel(TimetableEntry.name)
        private model: Model<TimetableEntryDocument>,
    ) { }

    create(data: Partial<TimetableEntry>) {
        return this.model.create(data);
    }

    findByTimetable(timetableId: string) {
        return this.model.find({ timetableId })
            .populate('timeSlotId subjectId teacherId')
            .sort({ dayOfWeek: 1 });
    }

    findById(id: string) {
        return this.model.findById(id).populate('timeSlotId subjectId teacherId');
    }

    update(id: string, data: Partial<TimetableEntry>) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).lean().exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }

    deleteByTimetable(timetableId: string) {
        return this.model.deleteMany({ timetableId });
    }
}
