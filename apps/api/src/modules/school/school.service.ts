import { Injectable, NotFoundException } from '@nestjs/common';
import { SchoolRepository } from './repository/school.repository';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class SchoolService {
  constructor(
    private readonly repo: SchoolRepository,
    private readonly logger: AppLogger,
  ) { }

  create(dto: CreateSchoolDto) {
    // 🪵 LOG: Records business logic started
    this.logger.log(`Creating school: ${dto.name}`, 'SchoolService');
    // (The Service doesn't know how to talk to MongoDB itself!), jummps to repository file
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const school = await this.repo.findById(id);
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  update(id: string, dto: UpdateSchoolDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}