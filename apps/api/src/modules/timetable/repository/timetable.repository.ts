import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Timetable } from '../schema/timetable.schema';
import { CreateTimetableDto } from '../dto/create-timetable.dto';
@Injectable()
export class TimetableRepository {
  constructor(
    @InjectModel(Timetable.name)
    private model: Model<Timetable>,
  ) {}

  create(data:CreateTimetableDto) {
    return this.model.create(data);
  }
}