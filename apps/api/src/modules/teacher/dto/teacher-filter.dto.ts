import { IsOptional, IsMongoId, IsArray, IsString, IsBoolean, IsInt, Min } from 'class-validator';

export class TeacherFilterDto {
  @IsOptional()
  @IsMongoId()
  schoolId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  status?: string[];

  @IsOptional()
  @IsBoolean()
  isAvailableForSubstitution?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  maxWeeklyPeriods?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
