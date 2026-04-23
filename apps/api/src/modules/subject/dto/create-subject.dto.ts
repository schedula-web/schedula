import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsMongoId,
  Min,
} from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  subjectName!: string;

  @IsNumber()
  @Min(1)
  periodsPerWeek!: number;

  @IsNumber()
  @Min(1)
  maxPeriodsPerDay!: number;

  @IsNumber()
  @Min(1)
  applicableGrade!: number;

  @IsOptional()
  @IsString()
  subjectCode?: string;

  @IsOptional()
  @IsNumber()
  roomNumber?: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teacherIds?: string[];

}