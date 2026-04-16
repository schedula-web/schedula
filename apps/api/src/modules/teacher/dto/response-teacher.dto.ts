import {
  IsMongoId,
  IsString,
  IsEmail,
  IsOptional,
  IsDate,
  IsInt,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TeacherAvailabilityDto } from './teacher-availability.dto';
import { TeacherSubstitutionSettingsDto } from './teacher-substitution-settings.dto';
import { TeacherWorkloadRulesDto } from './teacher-workload-rules.dto';
import { TeacherWorkloadDto } from './teacher-workload.dto';

export class ResponseTeacherDto {
  @IsMongoId()
  _id!: string;

  @IsMongoId()
  schoolId!: string;

  @IsString()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsDate()
  @IsOptional()
  joiningDate?: Date;

  @IsString()
  @IsOptional()
  employmentType?: string;

  @IsInt()
  @IsOptional()
  experienceYears?: number;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => TeacherAvailabilityDto)
  availability?: TeacherAvailabilityDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => TeacherSubstitutionSettingsDto)
  substitutionSettings?: TeacherSubstitutionSettingsDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => TeacherWorkloadRulesDto)
  workloadRules?: TeacherWorkloadRulesDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => TeacherWorkloadDto)
  workload?: TeacherWorkloadDto;

  @IsArray()
  @IsMongoId({ each: true })
  subjectIds!: string[];

  @IsDate()
  createdAt!: Date;

  @IsDate()
  updatedAt!: Date;
}
