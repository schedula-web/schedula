import { IsString, IsNotEmpty, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../../core/constants/enums';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  schoolName!: string;

  @IsString()
  @IsNotEmpty()
  schoolCode!: string;

  @IsString()
  @IsNotEmpty()
  boardType!: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  principalName!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsString()
  @IsOptional()
  schedulaId?: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role!: UserRole;
}