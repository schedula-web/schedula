import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from '../schema/class.schema';

@Injectable()
export class ClassRepository {
  constructor(
    @InjectModel(Class.name)
    private model: Model<Class>,
  ) {}

  create(data: any) {
    return this.model.create(data);
  }

  findAll() {
    return this.model.find().sort({ createdAt: -1 });
  }

  findById(id: string) {
    return this.model.findById(id);
  }
}