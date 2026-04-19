import { IsNotEmpty, IsString, IsEmail, IsOptional, ValidateIf, IsEnum } from 'class-validator';
import { UserRole } from '../../../core/constants/enums';

export class LoginUserDto {
    @ValidateIf(o => !o.schedulaId)
    @IsEmail()
    email?: string;

    @ValidateIf(o => !o.email)
    @IsString()
    @IsNotEmpty()
    schedulaId?: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsEnum(UserRole)
    @IsNotEmpty()
    role!: UserRole;
}