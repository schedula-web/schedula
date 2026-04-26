import { Injectable } from '@nestjs/common';
import { TimetableFormatRepository } from './repository/timetable-format.repository';
import { TimeSlotRepository } from './repository/time-slot.repository';
import { CreateTimetableFormatDto } from './dto/create-timetable-format.dto';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { Types } from 'mongoose';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class TimetableFormatService {
    constructor(
        private readonly formatRepo: TimetableFormatRepository,
        private readonly slotRepo: TimeSlotRepository,
        private readonly logger: AppLogger,
    ) { }

    createFormat(dto: CreateTimetableFormatDto, schedulaId: string) {
        this.logger.log(`Creating timetable format: ${dto.name} for school: ${schedulaId}`, 'TimetableFormatService');
        return this.formatRepo.create({ ...dto, schedulaId });
    }

    getFormats(schedulaId: string) {
        this.logger.log(`Fetching all timetable formats for school: ${schedulaId}`, 'TimetableFormatService');
        return this.formatRepo.findAll(schedulaId);
    }

    createTimeSlot(dto: CreateTimeSlotDto, schedulaId: string) {
        this.logger.log(`Creating time slot for format: ${dto.formatId} in school: ${schedulaId}`, 'TimetableFormatService');
        return this.slotRepo.create({
            ...dto,
            schedulaId,
            formatId: new Types.ObjectId(dto.formatId) as any
        });
    }

    getSlots(formatId: string) {
        this.logger.log(`Fetching all time slots for format: ${formatId}`, 'TimetableFormatService');
        return this.slotRepo.findByFormat(formatId);
    }
}