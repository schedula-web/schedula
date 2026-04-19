import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { AppLogger } from '../../../core/logger/logger.service';
import { SchedulaIdGeneratorService } from '../helpers/schedula-id-generator.service';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly logger: AppLogger,
    private readonly schedulaIdGenerator: SchedulaIdGeneratorService,
  ) { }

  async create(data: Partial<User>) {
    // Generate schedulaId before saving
    if (data.schoolName && !data.schedulaId) {
      data.schedulaId = await this.schedulaIdGenerator.generateSchedulaId(data.schoolName);
    }

    this.logger.log(`Saving user to database: ${data.schoolCode} with schedulaId: ${data.schedulaId}`, 'UserRepository');
    return this.userModel.create(data);
  }

  findAll() {
    return this.userModel.find().lean();
  }

  findById(id: string) {
    return this.userModel.findById(id).lean();
  }

  update(id: string, data: Partial<User>) {
    this.logger.log(`Updating user with id: ${id}`, 'UserRepository');
    return this.userModel
      .findByIdAndUpdate(id, data, {
        returnDocument: 'after',
        runValidators: true,
      })
      .lean();
  }

  delete(id: string) {
    this.logger.log(`Deleting user with id: ${id}`, 'UserRepository');
    return this.userModel.findByIdAndDelete(id).lean();
  }
}