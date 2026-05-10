import { IsMongoId, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateTimetableDto {
    @IsMongoId()
    @IsNotEmpty()
    classId!: string;

    @IsMongoId()
    @IsNotEmpty()
    formatId!: string;

    @IsEnum(['DRAFT', 'ACTIVE'])
    @IsOptional()
    status?: 'DRAFT' | 'ACTIVE';
}
