import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeacherWorkloadDto {
    @IsMongoId()
    @IsNotEmpty()
    teacherId!: string;

    @IsNumber()
    @IsOptional()
    dailyPeriods?: number;

    @IsNumber()
    @IsOptional()
    weeklyPeriods?: number;

    @IsNumber()
    @IsOptional()
    monthlyPeriods?: number;

    @IsNumber()
    @IsOptional()
    maxAllowedPeriods?: number;

    @IsString()
    @IsOptional()
    workloadStatus?: string;

    @IsNumber()
    @IsOptional()
    substitutionCount?: number;
}
