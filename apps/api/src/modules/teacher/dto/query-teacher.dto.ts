import { IsOptional, IsMongoId, IsString, IsEmail, IsBoolean, IsInt, Min } from 'class-validator';

export class QueryTeacherDto {
  @IsOptional()
  @IsMongoId()
  schoolId?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsBoolean()
  availableForSubstitution?: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
