import { Injectable } from '@nestjs/common';
import { ClassRepository } from './repository/class.repository';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassService {
  constructor(private repo: ClassRepository) {}

  create(dto: CreateClassDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findById(id: string) {
    return this.repo.findById(id);
  }
}