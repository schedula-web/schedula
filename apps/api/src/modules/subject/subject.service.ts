import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SubjectRepository } from './repository/subject.repository';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Types } from 'mongoose';
import { TeacherRepository } from '../teacher/repository/teacher.repository';

@Injectable()
export class SubjectService {
  constructor(
    private readonly subjectRepo: SubjectRepository,
    private readonly teacherRepo: TeacherRepository,
  ) {}

  // 🔥 convert ids safely
  private mapIds(dto: any) {
    return {
      ...dto,
      teacherIds: dto.teacherIds?.map(
        (id: string) => new Types.ObjectId(id),
      ),
    };
  }

  // ✅ CREATE
  async create(dto: CreateSubjectDto, schedulaId: string) {
    // 🔥 VALIDATE TEACHERS
    if (dto.teacherIds?.length) {
      const teacherIds = dto.teacherIds.map(
        (id) => new Types.ObjectId(id),
      );

const teachers = await this.teacherRepo.findAll({
  _id: { $in: teacherIds } as any,
  schedulaId,
});

      if (teachers.length !== dto.teacherIds.length) {
        throw new BadRequestException(
          'One or more teachers are invalid for this school',
        );
      }
    }

    try {
      return await this.subjectRepo.create({
        ...this.mapIds(dto),
        schedulaId,
      });
    } catch (error: any) {
      if (error?.code === 11000) {
        throw new ConflictException('Subject already exists');
      }
      throw error;
    }
  }

  // ✅ GET ALL
  async findAll(schedulaId: string) {
    return this.subjectRepo.findAll({ schedulaId });
  }

  // ✅ GET ONE (SECURE)
  async findOne(id: string, schedulaId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid subject ID');
    }

    const subject = await this.subjectRepo.findOne({
      _id: new Types.ObjectId(id),
      schedulaId,
    });

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    return subject;
  }

  // ✅ UPDATE
  async update(id: string, dto: UpdateSubjectDto, schedulaId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid subject ID');
    }

    // 🔥 VALIDATE TEACHERS
    if (dto.teacherIds?.length) {
      const teacherIds = dto.teacherIds.map(
        (id) => new Types.ObjectId(id),
      );
const teachers = await this.teacherRepo.findAll({
  _id: { $in: teacherIds } as any,
  schedulaId,
});
      if (teachers.length !== dto.teacherIds.length) {
        throw new BadRequestException(
          'One or more teachers are invalid for this school',
        );
      }
    }

    const updated = await this.subjectRepo.updateByFilter(
      { _id: new Types.ObjectId(id), schedulaId },
      this.mapIds(dto),
    );

    if (!updated) {
      throw new NotFoundException('Subject not found');
    }

    return updated;
  }

  // ✅ DELETE
  async remove(id: string, schedulaId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid subject ID');
    }

    const deleted = await this.subjectRepo.deleteByFilter({
      _id: new Types.ObjectId(id),
      schedulaId,
    });

    if (!deleted) {
      throw new NotFoundException('Subject not found');
    }

    return { success: true };
  }
}