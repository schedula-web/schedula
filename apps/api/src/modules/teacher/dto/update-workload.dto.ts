import { IsMongoId, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateWorkloadDto {
  @IsMongoId()
  teacherId!: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  additionalPeriods?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  substitutionCount?: number;
}
