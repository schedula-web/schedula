import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  ValidateNested,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TeacherAvailabilityDto } from './teacher-availability.dto';
import { TeacherSubstitutionSettingsDto } from './teacher-substitution-settings.dto';
import { TeacherWorkloadRulesDto } from './teacher-workload-rules.dto';

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  schoolId!: string;

  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsOptional()
  employeeId?: string;

  @IsDateString()
  @IsOptional()
  joiningDate?: string;

  @IsString()
  @IsOptional()
  employmentType?: string;

  @IsInt()
  @Min(0)
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

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  subjectIds?: string[];
}
