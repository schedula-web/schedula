import { Test, TestingModule } from '@nestjs/testing';
import { TimetableService } from './timetable.service';
import { TimetableRepository } from './repository/timetable.repository';
import { TimetableEntryRepository } from './repository/timetable-entry.repository';
import { AppLogger } from '../../core/logger/logger.service';
import { Types } from 'mongoose';

describe('TimetableService', () => {
    let service: TimetableService;
    let timetableRepo: TimetableRepository;
    let entryRepo: TimetableEntryRepository;

    const mockTimetableRepo = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    const mockEntryRepo = {
        create: jest.fn(),
        findByTimetable: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };

    const mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TimetableService,
                { provide: TimetableRepository, useValue: mockTimetableRepo },
                { provide: TimetableEntryRepository, useValue: mockEntryRepo },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<TimetableService>(TimetableService);
        timetableRepo = module.get<TimetableRepository>(TimetableRepository);
        entryRepo = module.get<TimetableEntryRepository>(TimetableEntryRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createTimetable', () => {
        it('should call timetableRepo.create', async () => {
            const dto = { classId: new Types.ObjectId().toHexString(), formatId: new Types.ObjectId().toHexString() };
            const schedulaId = 'school123';
            await service.createTimetable(dto as any, schedulaId);
            expect(timetableRepo.create).toHaveBeenCalled();
        });
    });
});
