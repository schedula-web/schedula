import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../schema/teacher.schema';
import { AppLogger } from '../../../core/logger/logger.service';

@Injectable()
export class TeacherRepository {
  constructor(
    @InjectModel(Teacher.name)
    private readonly teacherModel: Model<Teacher>,
    private readonly logger: AppLogger,
  ) {}

  create(data: Partial<Teacher>) {
    this.logger.log(`Saving teacher to database: ${data.fullName}`, 'TeacherRepository');
    return this.teacherModel.create(data);
  }

  findAll() {
    return this.teacherModel.find().populate('schoolId').lean();
  }

  findById(id: string) {
    return this.teacherModel.findById(id).populate('schoolId').lean();
  }

  update(id: string, data: Partial<Teacher>) {
    this.logger.log(`Updating teacher with id: ${id}`, 'TeacherRepository');
    return this.teacherModel
      .findByIdAndUpdate(id, data, {
        returnDocument: 'after',
        runValidators: true,
      })
      .lean();
  }

  delete(id: string) {
    this.logger.log(`Deleting teacher with id: ${id}`, 'TeacherRepository');
    return this.teacherModel.findByIdAndDelete(id).lean();
  }
}