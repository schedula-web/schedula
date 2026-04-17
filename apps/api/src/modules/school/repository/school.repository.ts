import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School } from '../schema/school.schema';
import { AppLogger } from '../../../core/logger/logger.service';

@Injectable()
export class SchoolRepository {
  constructor(
    @InjectModel(School.name)
    private readonly schoolModel: Model<School>,  // 💉 INJECTS THE BLUEPRINT
    private readonly logger: AppLogger,
  ) { }

  create(data: Partial<School>) {
    this.logger.log(`Saving school to database`, 'SchoolRepository');
    // 🏂 JUMP 3: Finally talks to the actual Database!
    return this.schoolModel.create(data);
  }

  findAll() {
    return this.schoolModel.find().lean();
  }

  findById(id: string) {
    return this.schoolModel.findById(id).lean();
  }

  update(id: string, data: Partial<School>) {
    this.logger.log(`Updating school with id: ${id}`, 'SchoolRepository');
    return this.schoolModel
      .findByIdAndUpdate(id, data, { returnDocument: 'after' })
      .lean();
  }

  delete(id: string) {
    this.logger.log(`Deleting school with id: ${id}`, 'SchoolRepository');
    return this.schoolModel.findByIdAndDelete(id).lean();
  }
}