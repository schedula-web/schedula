import {
  IsString,
  IsNumber,
  IsOptional,
  IsMongoId,
  IsArray,
  IsEnum,
} from 'class-validator';
import { WorkingDay, ClassStatus } from '../../../core/constants/enums';

export class CreateClassDto {

  @IsNumber()
  grade!: number;

  @IsString()
  section!: string;

  @IsString()
  className!: string;

  @IsOptional()
  @IsMongoId()
  classTeacherId?: string;

  @IsOptional()
  @IsNumber()
  numberOfStudents?: number;

  @IsOptional()
  @IsArray()
  subjectIds?: string[];

  @IsArray()
  @IsEnum(WorkingDay, { each: true })
  workingDays!: WorkingDay[];

  @IsNumber()
  periodsPerDay!: number;

  @IsNumber()
  maxPeriodsPerDay!: number;

  @IsOptional()
  @IsString()
  classroomId?: string;

  @IsOptional()
  @IsNumber()
  classCapacity?: number;

  @IsOptional()
  @IsEnum(ClassStatus)
  status?: ClassStatus;
}