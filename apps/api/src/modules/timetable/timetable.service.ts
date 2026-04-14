import { Injectable } from '@nestjs/common';
import { TimetableRepository } from './repository/timetable.repository';
import { CreateTimetableDto } from './dto/create-timetable.dto';
@Injectable()
export class TimetableService {
  constructor(private repo: TimetableRepository) {}

  async generate(dto:CreateTimetableDto) {
    return this.repo.create(dto);
  }
}