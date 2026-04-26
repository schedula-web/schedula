import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { TeacherRepository } from './repository/teacher.repository';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Types } from 'mongoose';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class TeacherService {
  constructor(
    private readonly teacherRepo: TeacherRepository,
    private readonly logger: AppLogger,
  ) {}

  // ✅ safe ObjectId conversion
  private toObjectId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ObjectId');
    }
    return new Types.ObjectId(id);
  }

  // ✅ map IDs safely
  private mapIds(dto: any) {
    return {
      ...dto,
      subjectIds: dto.subjectIds?.map((id: string) =>
        this.toObjectId(id),
      ),
      substitutionSettings: dto.substitutionSettings
        ? {
            ...dto.substitutionSettings,
            preferredSubjectIds:
              dto.substitutionSettings.preferredSubjectIds?.map(
                (id: string) => this.toObjectId(id),
              ),
          }
        : undefined,
    };
  }

  // ✅ CREATE
  async create(dto: CreateTeacherDto, schedulaId: string) {
    this.logger.log(`Creating teacher with email: ${dto.email} for school: ${schedulaId}`, 'TeacherService');
    const existing = await this.teacherRepo.findOne({
      email: dto.email.toLowerCase(),
      schedulaId,
    });

    if (existing) {
      throw new ConflictException('Teacher already exists');
    }

    return this.teacherRepo.create({
      ...this.mapIds(dto),
      schedulaId,
      email: dto.email.toLowerCase(),
    });
  }

  // ✅ GET ALL
  findAll(schedulaId: string) {
    this.logger.log(`Fetching all teachers for school: ${schedulaId}`, 'TeacherService');
    return this.teacherRepo.findAll({ schedulaId });
  }

  // ✅ GET ONE
  async findOne(id: string, schedulaId: string) {
    this.logger.log(`Fetching teacher with ID: ${id} for school: ${schedulaId}`, 'TeacherService');
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid teacher ID');
    }

    const teacher = await this.teacherRepo.findOne({
      _id: new Types.ObjectId(id),
      schedulaId,
    });

    if (!teacher) {
      throw new NotFoundException('Teacher not found');
    }

    return teacher;
  }

  // ✅ UPDATE
  async update(id: string, dto: UpdateTeacherDto, schedulaId: string) {
    this.logger.log(`Updating teacher with ID: ${id} for school: ${schedulaId}`, 'TeacherService');
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid teacher ID');
    }

    const updated = await this.teacherRepo.updateByFilter(
      { _id: new Types.ObjectId(id), schedulaId },
      this.mapIds(dto),
    );

    if (!updated) {
      throw new NotFoundException('Teacher not found');
    }

    return updated;
  }

  // ✅ DELETE
  async remove(id: string, schedulaId: string) {
    this.logger.warn(`Deleting teacher with ID: ${id} for school: ${schedulaId}`, 'TeacherService');
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid teacher ID');
    }

    const deleted = await this.teacherRepo.deleteByFilter({
      _id: new Types.ObjectId(id),
      schedulaId,
    });

    if (!deleted) {
      throw new NotFoundException('Teacher not found');
    }

    return { success: true };
  }
}