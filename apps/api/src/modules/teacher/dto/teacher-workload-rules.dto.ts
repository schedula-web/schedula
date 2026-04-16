import { IsInt, Min, Max, IsOptional, IsString, IsBoolean } from 'class-validator';

export class TeacherWorkloadRulesDto {
  @IsInt()
  @Min(1)
  @Max(60)
  @IsOptional()
  maxPeriodsPerWeek?: number;

  @IsString()
  @IsOptional()
  preferredFreePeriod?: string;

  @IsBoolean()
  @IsOptional()
  allowExtraLoad?: boolean;
}
