import { IsArray, IsOptional, IsString, Matches, IsInt, Min, Max } from 'class-validator';
import { UnavailablePeriodDto } from './unavailable-period.dto';

export class TeacherAvailabilityDto {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  workingDays?: string[];

  @IsString()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  startTime?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
  endTime?: string;

  @IsInt()
  @Min(1)
  @Max(12)
  @IsOptional()
  maxPeriodsPerDay?: number;

  @IsArray()
  @IsOptional()
  unavailablePeriods?: UnavailablePeriodDto[];
}
