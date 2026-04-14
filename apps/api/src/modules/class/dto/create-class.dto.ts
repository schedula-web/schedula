import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsString()
  grade!: string;

  @IsString()
  section!: string;

  @IsString()
  className!: string;

  @IsOptional()
  @IsString()
  classTeacher?: string;

  @IsOptional()
  @IsNumber()
  numberOfStudents?: number;

  @IsOptional()
  @IsArray()
  subjects?: string[];

  @IsOptional()
  @IsArray()
  workingDays?: string[];

  @IsOptional()
  @IsNumber()
  periodsPerDay?: number;

  @IsOptional()
  @IsNumber()
  maxPeriodsPerDay?: number;

  @IsOptional()
  @IsString()
  classroomId?: string;

  @IsOptional()
  @IsNumber()
  classCapacity?: number;

  @IsOptional()
  @IsString()
  schoolId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
