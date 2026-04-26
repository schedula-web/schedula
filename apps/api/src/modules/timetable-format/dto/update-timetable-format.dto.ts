import { PartialType } from '@nestjs/mapped-types';
import { CreateTimetableFormatDto } from './create-timetable-format.dto';

export class UpdateTimetableFormatDto extends PartialType(CreateTimetableFormatDto) { }