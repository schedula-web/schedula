import { Controller, Post, Body } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
@Controller('timetable')
export class TimetableController {
  constructor(private service: TimetableService) {}

  @Post('generate')
  generate(@Body() dto:CreateTimetableDto) {
    return this.service.generate(dto);
  }
}