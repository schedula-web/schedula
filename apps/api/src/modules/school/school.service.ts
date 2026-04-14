import { Injectable, NotFoundException } from '@nestjs/common';
import { SchoolRepository } from './repository/school.repository';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(private readonly repo: SchoolRepository) {}

  create(dto: CreateSchoolDto) {
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