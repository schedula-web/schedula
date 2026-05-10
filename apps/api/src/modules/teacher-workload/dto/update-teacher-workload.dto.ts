import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherWorkloadDto } from './create-teacher-workload.dto';

export class UpdateTeacherWorkloadDto extends PartialType(CreateTeacherWorkloadDto) { }
