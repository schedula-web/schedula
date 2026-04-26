import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { ClassRepository } from './repository/class.repository';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Types } from 'mongoose';
import { TeacherRepository } from '../teacher/repository/teacher.repository';
import { SubjectRepository } from '../subject/repository/subject.repository';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class ClassService {
  constructor(
    private readonly repo: ClassRepository,
    private readonly teacherRepo: TeacherRepository,
    private readonly subjectRepo: SubjectRepository,
    private readonly logger: AppLogger,
  ) {}

  // ✅ CREATE
  async create(dto: CreateClassDto, schedulaId: string) {
    this.logger.log(`Creating class: ${dto.grade}-${dto.section} for school: ${schedulaId}`, 'ClassService');
    const exists = await this.repo.findOne({
      schedulaId,
      grade: dto.grade,
      section: dto.section,
    });

    if (exists) {
      throw new BadRequestException(
        'Class already exists for this grade and section',
      );
    }

    // 🔥 VALIDATE TEACHER
    if (dto.classTeacherId) {
      const teacher = await this.teacherRepo.findOne({
        _id: new Types.ObjectId(dto.classTeacherId),
        schedulaId,
      });

      if (!teacher) {
        throw new BadRequestException(
          'Invalid class teacher for this school',
        );
      }
    }

    // 🔥 VALIDATE SUBJECTS
    if (dto.subjectIds?.length) {
      const subjectObjectIds = dto.subjectIds.map(
        (id) => new Types.ObjectId(id),
      );

  const subjects = await this.subjectRepo.findAll({
  _id: { $in: subjectObjectIds } as any,
  schedulaId,
});

      if (subjects.length !== dto.subjectIds.length) {
        throw new BadRequestException(
          'One or more subjects are invalid for this school',
        );
      }
    }

    const data = {
      ...dto,
      schedulaId,
      classTeacherId: dto.classTeacherId
        ? new Types.ObjectId(dto.classTeacherId)
        : undefined,
      subjectIds: dto.subjectIds?.map(
        (id) => new Types.ObjectId(id),
      ),
    };

    try {
      return await this.repo.create(data);
    } catch (error: any) {
      if (error.code === 11000) {
        throw new BadRequestException('Duplicate class');
      }
      throw error;
    }
  }

  // ✅ GET ALL
  findAll(schedulaId: string) {
    this.logger.log(`Fetching all classes for school: ${schedulaId}`, 'ClassService');
    return this.repo.findAll({ schedulaId });
  }

  // ✅ UPDATE
  async update(id: string, dto: UpdateClassDto, schedulaId: string) {
    this.logger.log(`Updating class with ID: ${id} for school: ${schedulaId}`, 'ClassService');
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid class ID');
    }

    const objectId = new Types.ObjectId(id);

    // 🔥 VALIDATE TEACHER
    if (dto.classTeacherId) {
      const teacher = await this.teacherRepo.findOne({
        _id: new Types.ObjectId(dto.classTeacherId),
        schedulaId,
      });

      if (!teacher) {
        throw new BadRequestException(
          'Invalid class teacher for this school',
        );
      }
    }

    // 🔥 VALIDATE SUBJECTS
    if (dto.subjectIds?.length) {
      const subjectObjectIds = dto.subjectIds.map(
        (id) => new Types.ObjectId(id),
      );

const subjects = await this.subjectRepo.findAll({
  _id: { $in: subjectObjectIds } as any,
  schedulaId,
});

      if (subjects.length !== dto.subjectIds.length) {
        throw new BadRequestException(
          'One or more subjects are invalid for this school',
        );
      }
    }

    const data = {
      ...dto,
      classTeacherId: dto.classTeacherId
        ? new Types.ObjectId(dto.classTeacherId)
        : undefined,
      subjectIds: dto.subjectIds?.map(
        (id) => new Types.ObjectId(id),
      ),
    };

    const updated = await this.repo.updateByFilter(
      { _id: objectId, schedulaId },
      data,
    );

    if (!updated) {
      throw new NotFoundException('Class not found');
    }

    return updated;
  }

  // ✅ DELETE
  async delete(id: string, schedulaId: string) {
    this.logger.warn(`Deleting class with ID: ${id} for school: ${schedulaId}`, 'ClassService');
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid class ID');
    }

    const objectId = new Types.ObjectId(id);

    const deleted = await this.repo.deleteByFilter({
      _id: objectId,
      schedulaId,
    });

    if (!deleted) {
      throw new NotFoundException('Class not found');
    }

    return { message: 'Class deleted successfully' };
  }
}