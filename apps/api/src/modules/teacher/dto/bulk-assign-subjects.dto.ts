import { IsArray, IsMongoId } from 'class-validator';

export class BulkAssignSubjectsDto {
  @IsArray()
  @IsMongoId({ each: true })
  teacherIds!: string[];

  @IsArray()
  @IsMongoId({ each: true })
  subjectIds!: string[];
}
