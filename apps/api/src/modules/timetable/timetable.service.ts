import { Injectable } from '@nestjs/common';
import { TimetableRepository } from './repository/timetable.repository';
import { TimetableEntryRepository } from './repository/timetable-entry.repository';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { CreateTimetableEntryDto } from './dto/create-timetable-entry.dto';
import { UpdateTimetableEntryDto } from './dto/update-timetable-entry.dto';
import { Types } from 'mongoose';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class TimetableService {
    constructor(
        private readonly timetableRepo: TimetableRepository,
        private readonly entryRepo: TimetableEntryRepository,
        private readonly logger: AppLogger,
    ) { }

    createTimetable(dto: CreateTimetableDto, schedulaId: string) {
        this.logger.log(`Creating timetable for class: ${dto.classId} in school: ${schedulaId}`, 'TimetableService');
        return this.timetableRepo.create({
            ...dto,
            schedulaId,
            classId: new Types.ObjectId(dto.classId) as any,
            formatId: new Types.ObjectId(dto.formatId) as any
        });
    }

    getTimetables(schedulaId: string) {
        this.logger.log(`Fetching all timetables for school: ${schedulaId}`, 'TimetableService');
        return this.timetableRepo.findAll(schedulaId);
    }

    getTimetableById(id: string) {
        this.logger.log(`Fetching timetable: ${id}`, 'TimetableService');
        return this.timetableRepo.findById(id);
    }

    updateTimetable(id: string, dto: UpdateTimetableDto) {
        this.logger.log(`Updating timetable: ${id}`, 'TimetableService');
        const updateData: any = { ...dto };
        if (dto.classId) updateData.classId = new Types.ObjectId(dto.classId);
        if (dto.formatId) updateData.formatId = new Types.ObjectId(dto.formatId);
        return this.timetableRepo.update(id, updateData);
    }

    deleteTimetable(id: string) {
        this.logger.log(`Deleting timetable: ${id}`, 'TimetableService');
        return this.timetableRepo.delete(id);
    }

    // Entry methods
    createEntry(dto: CreateTimetableEntryDto, schedulaId: string) {
        this.logger.log(`Creating timetable entry for timetable: ${dto.timetableId}`, 'TimetableService');
        return this.entryRepo.create({
            ...dto,
            schedulaId,
            timetableId: new Types.ObjectId(dto.timetableId) as any,
            timeSlotId: new Types.ObjectId(dto.timeSlotId) as any,
            subjectId: dto.subjectId ? new Types.ObjectId(dto.subjectId) as any : undefined,
            teacherId: dto.teacherId ? new Types.ObjectId(dto.teacherId) as any : undefined,
        });
    }

    getEntriesByTimetable(timetableId: string) {
        this.logger.log(`Fetching entries for timetable: ${timetableId}`, 'TimetableService');
        return this.entryRepo.findByTimetable(timetableId);
    }

    updateEntry(id: string, dto: UpdateTimetableEntryDto) {
        this.logger.log(`Updating entry: ${id}`, 'TimetableService');
        const updateData: any = { ...dto };
        if (dto.timetableId) updateData.timetableId = new Types.ObjectId(dto.timetableId);
        if (dto.timeSlotId) updateData.timeSlotId = new Types.ObjectId(dto.timeSlotId);
        if (dto.subjectId) updateData.subjectId = new Types.ObjectId(dto.subjectId);
        if (dto.teacherId) updateData.teacherId = new Types.ObjectId(dto.teacherId);
        return this.entryRepo.update(id, updateData);
    }

    deleteEntry(id: string) {
        this.logger.log(`Deleting entry: ${id}`, 'TimetableService');
        return this.entryRepo.delete(id);
    }
}
