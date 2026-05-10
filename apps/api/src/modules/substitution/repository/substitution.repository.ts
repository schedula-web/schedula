import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Substitution, SubstitutionDocument } from '../schema/substitution.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubstitutionRepository {
    constructor(
        @InjectModel(Substitution.name)
        private model: Model<SubstitutionDocument>,
    ) { }

    create(data: Partial<Substitution>) {
        return this.model.create(data);
    }

    findAll(schedulaId: string, filter: any = {}) {
        return this.model.find({ schedulaId, ...filter })
            .populate('classId timeSlotId subjectId absentTeacherId substituteTeacherId')
            .sort({ date: -1 });
    }

    findById(id: string) {
        return this.model.findById(id)
            .populate('classId timeSlotId subjectId absentTeacherId substituteTeacherId');
    }

    update(id: string, data: Partial<Substitution>) {
        return this.model.findByIdAndUpdate(id, data, { new: true }).lean().exec();
    }

    delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
}
