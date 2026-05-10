import { Test, TestingModule } from '@nestjs/testing';
import { TimetableController } from './timetable.controller';
import { TimetableService } from './timetable.service';
import { AppLogger } from '../../core/logger/logger.service';

describe('TimetableController', () => {
    let controller: TimetableController;
    let service: TimetableService;

    const mockService = {
        createTimetable: jest.fn(),
        getTimetables: jest.fn(),
        getTimetableById: jest.fn(),
        updateTimetable: jest.fn(),
        deleteTimetable: jest.fn(),
        createEntry: jest.fn(),
        getEntriesByTimetable: jest.fn(),
        updateEntry: jest.fn(),
        deleteEntry: jest.fn(),
    };

    const mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TimetableController],
            providers: [
                { provide: TimetableService, useValue: mockService },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        controller = module.get<TimetableController>(TimetableController);
        service = module.get<TimetableService>(TimetableService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
