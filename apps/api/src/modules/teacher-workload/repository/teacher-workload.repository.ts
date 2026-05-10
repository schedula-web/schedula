import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TeacherWorkload, TeacherWorkloadDocument } from '../schema/teacher-workload.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class TeacherWorkloadRepository {
    constructor(
        @InjectModel(TeacherWorkload.name)
        private model: Model<TeacherWorkloadDocument>,
    ) { }

    create(data: Partial<TeacherWorkload>) {
        return this.model.create(data);
    }

    findAll(schedulaId: string) {
        return this.model.find({ schedulaId }).populate('teacherId');
    }

    findByTeacherId(teacherId: string) {
        return this.model.findOne({ teacherId: new Types.ObjectId(teacherId) }).populate('teacherId');
    }

    updateByTeacher(teacherId: string, data: Partial<TeacherWorkload>) {
        return this.model.findOneAndUpdate(
            { teacherId: new Types.ObjectId(teacherId) },
            { $set: data },
            { new: true, upsert: true }
        ).lean().exec();
    }

    incrementSubstitution(teacherId: string) {
        return this.model.findOneAndUpdate(
            { teacherId: new Types.ObjectId(teacherId) },
            { $inc: { substitutionCount: 1 } },
            { new: true }
        ).exec();
    }
}
