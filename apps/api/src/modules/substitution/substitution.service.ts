import { Injectable } from '@nestjs/common';
import { SubstitutionRepository } from './repository/substitution.repository';
import { CreateSubstitutionDto } from './dto/create-substitution.dto';
import { UpdateSubstitutionDto } from './dto/update-substitution.dto';
import { Types } from 'mongoose';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class SubstitutionService {
    constructor(
        private readonly repository: SubstitutionRepository,
        private readonly logger: AppLogger,
    ) { }

    create(dto: CreateSubstitutionDto, schedulaId: string) {
        this.logger.log(`Creating substitution for date: ${dto.date} in school: ${schedulaId}`, 'SubstitutionService');
        return this.repository.create({
            ...dto,
            schedulaId,
            date: new Date(dto.date),
            classId: new Types.ObjectId(dto.classId) as any,
            timeSlotId: new Types.ObjectId(dto.timeSlotId) as any,
            subjectId: new Types.ObjectId(dto.subjectId) as any,
            absentTeacherId: new Types.ObjectId(dto.absentTeacherId) as any,
            substituteTeacherId: dto.substituteTeacherId ? new Types.ObjectId(dto.substituteTeacherId) as any : undefined,
        });
    }

    findAll(schedulaId: string, date?: string) {
        this.logger.log(`Fetching substitutions for school: ${schedulaId}`, 'SubstitutionService');
        const filter: any = {};
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            filter.date = { $gte: startOfDay, $lte: endOfDay };
        }
        return this.repository.findAll(schedulaId, filter);
    }

    findOne(id: string) {
        this.logger.log(`Fetching substitution: ${id}`, 'SubstitutionService');
        return this.repository.findById(id);
    }

    update(id: string, dto: UpdateSubstitutionDto) {
        this.logger.log(`Updating substitution: ${id}`, 'SubstitutionService');
        const updateData: any = { ...dto };
        if (dto.date) updateData.date = new Date(dto.date);
        if (dto.classId) updateData.classId = new Types.ObjectId(dto.classId);
        if (dto.timeSlotId) updateData.timeSlotId = new Types.ObjectId(dto.timeSlotId);
        if (dto.subjectId) updateData.subjectId = new Types.ObjectId(dto.subjectId);
        if (dto.absentTeacherId) updateData.absentTeacherId = new Types.ObjectId(dto.absentTeacherId);
        if (dto.substituteTeacherId) updateData.substituteTeacherId = new Types.ObjectId(dto.substituteTeacherId);
        
        return this.repository.update(id, updateData);
    }

    remove(id: string) {
        this.logger.log(`Deleting substitution: ${id}`, 'SubstitutionService');
        return this.repository.delete(id);
    }
}
