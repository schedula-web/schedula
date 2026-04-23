import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsArray,
  IsMongoId,
  IsNumber,
  IsBoolean,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class AvailabilityDto {
  @IsArray()
  @IsString({ each: true })
  workingDays!: string[];

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;

  @IsNumber()
  maxPeriodsPerDay!: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  unavailablePeriods?: number[];
}

class SubstitutionSettingsDto {
  @IsBoolean()
  availableForSubstitution!: boolean;

  @IsNumber()
  maxSubstitutionsPerWeek!: number;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  preferredSubjectIds?: string[];

  @IsBoolean()
  avoidConsecutiveSubstitutions!: boolean;
}

class WorkloadRulesDto {
  @IsNumber()
  maxPeriodsPerWeek!: number;

  @IsOptional()
  @IsString()
  preferredFreePeriod?: string;

  @IsBoolean()
  allowExtraLoad!: boolean;
}

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  employeeId?: string;

  @IsOptional()
  joiningDate?: Date;

  @IsOptional()
  @IsString()
  employmentType?: string;

  @IsOptional()
  @IsNumber()
  experienceYears?: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AvailabilityDto)
  availability?: AvailabilityDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => SubstitutionSettingsDto)
  substitutionSettings?: SubstitutionSettingsDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => WorkloadRulesDto)
  workloadRules?: WorkloadRulesDto;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  subjectIds?: string[];
}