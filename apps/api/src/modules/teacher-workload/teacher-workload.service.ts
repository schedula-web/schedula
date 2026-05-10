import { Injectable } from '@nestjs/common';
import { TeacherWorkloadRepository } from './repository/teacher-workload.repository';
import { CreateTeacherWorkloadDto } from './dto/create-teacher-workload.dto';
import { UpdateTeacherWorkloadDto } from './dto/update-teacher-workload.dto';
import { AppLogger } from '../../core/logger/logger.service';
import { Types } from 'mongoose';

@Injectable()
export class TeacherWorkloadService {
    constructor(
        private readonly repository: TeacherWorkloadRepository,
        private readonly logger: AppLogger,
    ) { }

    create(dto: CreateTeacherWorkloadDto, schedulaId: string) {
        this.logger.log(`Initializing workload for teacher: ${dto.teacherId}`, 'TeacherWorkloadService');
        return this.repository.create({
            ...dto,
            schedulaId,
            teacherId: new Types.ObjectId(dto.teacherId) as any
        });
    }


    findAll(schedulaId: string) {
        this.logger.log(`Fetching all workloads for school: ${schedulaId}`, 'TeacherWorkloadService');
        return this.repository.findAll(schedulaId);
    }

    findByTeacher(teacherId: string) {
        this.logger.log(`Fetching workload for teacher: ${teacherId}`, 'TeacherWorkloadService');
        return this.repository.findByTeacherId(teacherId);
    }

    update(teacherId: string, dto: UpdateTeacherWorkloadDto) {
        this.logger.log(`Updating workload for teacher: ${teacherId}`, 'TeacherWorkloadService');
        return this.repository.updateByTeacher(teacherId, dto as any);
    }

    trackSubstitution(teacherId: string) {
        this.logger.log(`Incrementing substitution count for teacher: ${teacherId}`, 'TeacherWorkloadService');
        return this.repository.incrementSubstitution(teacherId);
    }
}
