import { Injectable, NotFoundException } from '@nestjs/common';
import { TeacherRepository } from './repository/teacher.repository';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class TeacherService {
  constructor(
    private readonly repo: TeacherRepository,
    private readonly logger: AppLogger,
  ) {}

  create(dto: CreateTeacherDto) {
    this.logger.log(`Creating teacher: ${dto.fullName}`, 'TeacherService');
    return this.repo.create(dto as any);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const teacher = await this.repo.findById(id);
    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }
    return teacher;
  }

  update(id: string, dto: UpdateTeacherDto) {
    return this.repo.update(id, dto as any);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}