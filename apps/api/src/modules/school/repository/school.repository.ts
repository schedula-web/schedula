import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School } from '../schema/school.schema';

@Injectable()
export class SchoolRepository {
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<School>,
  ) {}

  create(data: Partial<School>) {
    return this.schoolModel.create(data);
  }

  findAll() {
    return this.schoolModel.find().lean();
  }

  findById(id: string) {
    return this.schoolModel.findById(id).lean();
  }

  update(id: string, data: Partial<School>) {
    return this.schoolModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean();
  }

  delete(id: string) {
    return this.schoolModel.findByIdAndDelete(id).lean();
  }
}