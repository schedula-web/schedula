import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimetableFormat, TimetableFormatDocument } from '../schema/timetable-format.schema';
import { Model } from 'mongoose';

@Injectable()
export class TimetableFormatRepository {
    constructor(
        @InjectModel(TimetableFormat.name)
        private model: Model<TimetableFormatDocument>,
    ) { }

    create(data: Partial<TimetableFormat>) {
        return this.model.create(data);
    }

    findAll(schedulaId: string) {
        return this.model.find({ schedulaId });
    }

    findById(id: string) {
        return this.model.findById(id);
    }

    update(id: string, data: Partial<TimetableFormat>) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).lean().exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}