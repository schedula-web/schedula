import { IsMongoId, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateTimetableEntryDto {
    @IsMongoId()
    @IsNotEmpty()
    timetableId!: string;

    @IsEnum(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])
    @IsNotEmpty()
    dayOfWeek!: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT';

    @IsMongoId()
    @IsNotEmpty()
    timeSlotId!: string;

    @IsMongoId()
    @IsOptional()
    subjectId?: string;

    @IsMongoId()
    @IsOptional()
    teacherId?: string;
}
