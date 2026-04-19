import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { AppLogger } from '../../../core/logger/logger.service';
import { SchedulaIdGeneratorService } from '../helpers/schedula-id-generator.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly logger: AppLogger,
    private readonly schedulaIdGenerator: SchedulaIdGeneratorService,
  ) { }

  async create(data: Partial<User>) {
    const userData = { ...data };

    // Hash the password
    if (userData.password) {
      const salt = await bcrypt.genSalt(10);
      userData.password = await bcrypt.hash(userData.password, salt);
    }

    // Generate schedulaId
    if (userData.schoolName && !userData.schedulaId) {
      userData.schedulaId = await this.schedulaIdGenerator.generateSchedulaId(userData.schoolName);
    }

    this.logger.log(`Saving user to database: ${userData.schoolCode} with schedulaId: ${userData.schedulaId}`, 'UserRepository');
    return this.userModel.create(userData);
  }

  findAll() {
    return this.userModel.find().lean().exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).lean().exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async findByEmailWithPassword(email: string) {
    return this.userModel.findOne({ email }).select('+password').exec();
  }

  findBySchedulaId(schedulaId: string) {
    return this.userModel.findOne({ schedulaId }).lean().exec();
  }

  async findBySchedulaIdWithPassword(schedulaId: string) {
    return this.userModel.findOne({ schedulaId }).select('+password').exec();
  }

  findBySchoolCode(schoolCode: string) {
    return this.userModel.findOne({ schoolCode }).lean().exec();
  }

  async update(id: string, data: Partial<User>) {
    this.logger.log(`Updating user with id: ${id}`, 'UserRepository');

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      data.password = await bcrypt.hash(data.password, salt);
    }

    return this.userModel
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .lean()
      .exec();
  }

  async delete(id: string) {
    this.logger.log(`Deleting user with id: ${id}`, 'UserRepository');
    return this.userModel.findByIdAndDelete(id).lean().exec();
  }
}