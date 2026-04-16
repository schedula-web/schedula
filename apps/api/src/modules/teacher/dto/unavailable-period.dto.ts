import { IsDateString, IsArray, IsString, IsOptional } from 'class-validator';

export class UnavailablePeriodDto {
  @IsDateString()
  date!: string;

  @IsArray()
  @IsString({ each: true })
  periodLabels!: string[];

  @IsString()
  @IsOptional()
  reason?: string;
}
