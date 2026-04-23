import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from '../schema/class.schema';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(Class.name)
    private readonly model: Model<ClassDocument>,
  ) {}

  // ✅ CREATE
  create(data: Partial<Class>) {
    return this.model.create(data);
  }

  // ✅ FIND ONE
  findOne(filter: Partial<Class>) {
    return this.model.findOne(filter).lean().exec();
  }

  // ✅ FIND ALL
  findAll(filter: Partial<Class>) {
    return this.model.find(filter).lean().exec();
  }

  // ✅ UPDATE
  updateByFilter(filter: Partial<Class>, data: Partial<Class>) {
    return this.model
      .findOneAndUpdate(filter, data, { new: true })
      .lean()
      .exec();
  }

  // ✅ DELETE
  deleteByFilter(filter: Partial<Class>) {
    return this.model
      .findOneAndDelete(filter)
      .lean()
      .exec();
  }
}