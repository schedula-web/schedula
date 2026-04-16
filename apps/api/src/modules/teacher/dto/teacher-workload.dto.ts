import { IsInt, Min, IsString } from 'class-validator';

export class TeacherWorkloadDto {
  @IsInt()
  @Min(0)
  dailyPeriods!: number;

  @IsInt()
  @Min(0)
  weeklyPeriods!: number;

  @IsInt()
  @Min(0)
  monthlyPeriods!: number;

  @IsInt()
  @Min(0)
  maxAllowedPeriods!: number;

  @IsString()
  workloadStatus!: string;

  @IsInt()
  @Min(0)
  substitutionCount!: number;
}
