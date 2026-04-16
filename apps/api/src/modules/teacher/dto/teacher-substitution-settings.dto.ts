import { IsBoolean, IsOptional, IsInt, Min, Max, IsArray, IsMongoId } from 'class-validator';

export class TeacherSubstitutionSettingsDto {
  @IsBoolean()
  @IsOptional()
  availableForSubstitution?: boolean;

  @IsInt()
  @Min(0)
  @Max(10)
  @IsOptional()
  maxSubstitutionsPerWeek?: number;

  @IsArray()
  @IsOptional()
  @IsMongoId({ each: true })
  preferredSubjectIds?: string[];

  @IsBoolean()
  @IsOptional()
  avoidConsecutiveSubstitutions?: boolean;
}
