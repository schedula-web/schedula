import { IsString, IsArray } from 'class-validator';

export class CreateTimetableDto {
  @IsString()
  classId!: string;

  @IsArray()
  schedule!: any[];
}