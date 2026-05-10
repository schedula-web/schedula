import { IsMongoId, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { SubstitutionStatus } from '../../../core/constants/enums';

export class CreateSubstitutionDto {
    @IsDateString()
    @IsNotEmpty()
    date!: string;

    @IsMongoId()
    @IsNotEmpty()
    classId!: string;

    @IsMongoId()
    @IsNotEmpty()
    timeSlotId!: string;

    @IsMongoId()
    @IsNotEmpty()
    subjectId!: string;

    @IsMongoId()
    @IsNotEmpty()
    absentTeacherId!: string;

    @IsMongoId()
    @IsOptional()
    substituteTeacherId?: string;

    @IsEnum(SubstitutionStatus)
    @IsOptional()
    status?: SubstitutionStatus;
}

