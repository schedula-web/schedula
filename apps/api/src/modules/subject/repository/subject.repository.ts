import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject, SubjectDocument } from '../schema/subject.schema';
import { Model } from 'mongoose';

@Injectable()
export class SubjectRepository {
  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<SubjectDocument>,
  ) {}

  // ✅ CREATE
  create(data: Partial<Subject>) {
    return this.subjectModel.create(data);
  }

  // ✅ FIND ONE (GENERIC FILTER)
  findOne(filter: Partial<Subject>) {
    return this.subjectModel.findOne(filter).lean().exec();
  }

  // ✅ FIND ALL (GENERIC FILTER)
  findAll(filter: Partial<Subject>) {
    return this.subjectModel.find(filter).lean().exec();
  }

  // ✅ UPDATE (SAFE)
  updateByFilter(filter: Partial<Subject>, data: Partial<Subject>) {
    return this.subjectModel
      .findOneAndUpdate(filter, data, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  // ✅ DELETE (SAFE)
  deleteByFilter(filter: Partial<Subject>) {
    return this.subjectModel
      .findOneAndDelete(filter)
      .lean()
      .exec();
  }
}