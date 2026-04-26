import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTimetableFormatDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
}