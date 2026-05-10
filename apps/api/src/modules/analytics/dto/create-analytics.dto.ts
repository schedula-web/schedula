import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAnalyticsDto {
    @IsNumber()
    @IsOptional()
    timetableEfficiency?: number;

    @IsNumber()
    @IsOptional()
    teacherUtilization?: number;

    @IsNumber()
    @IsOptional()
    substitutionEvents?: number;

    @IsNumber()
    @IsOptional()
    subjectsCovered?: number;
}
