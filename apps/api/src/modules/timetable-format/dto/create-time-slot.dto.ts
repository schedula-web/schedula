import { IsString, IsNotEmpty, IsMongoId, IsEnum, IsOptional, IsNumber } from 'class-validator';

export class CreateTimeSlotDto {
    @IsMongoId()
    @IsNotEmpty()
    formatId!: string;

    @IsEnum(['PERIOD', 'BREAK'])
    @IsNotEmpty()
    slotType!: 'PERIOD' | 'BREAK';

    @IsOptional()
    @IsString()
    periodLabel?: string;

    @IsString()
    @IsNotEmpty()
    startTime!: string;

    @IsString()
    @IsNotEmpty()
    endTime!: string;

    @IsNumber()
    @IsNotEmpty()
    orderIndex!: number;
}