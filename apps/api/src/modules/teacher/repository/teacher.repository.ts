import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from '../schema/teacher.schema';

@Injectable()
export class TeacherRepository {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<TeacherDocument>,
  ) {}

  // ✅ CREATE
  create(data: Partial<Teacher>) {
    return this.teacherModel.create(data);
  }

  // ✅ FIND ONE (GENERIC FILTER)
  findOne(filter: Partial<Teacher>) {
    return this.teacherModel.findOne(filter).lean().exec();
  }

  // ✅ FIND ALL (GENERIC FILTER)
  findAll(filter: Partial<Teacher>) {
    return this.teacherModel.find(filter).lean().exec();
  }

  // ✅ FIND BY EMAIL (KEEP THIS)
  findByEmail(email: string, schedulaId: string) {
    return this.teacherModel
      .findOne({ email: email.toLowerCase(), schedulaId })
      .lean()
      .exec();
  }

  // ✅ UPDATE (SAFE)
  updateByFilter(filter: Partial<Teacher>, data: Partial<Teacher>) {
    return this.teacherModel
      .findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  // ✅ DELETE (SAFE)
  deleteByFilter(filter: Partial<Teacher>) {
    return this.teacherModel
      .findOneAndDelete(filter)
      .lean()
      .exec();
  }
}