import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    schedulaId?: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}