import { Test, TestingModule } from '@nestjs/testing';
import { TeacherWorkloadController } from './teacher-workload.controller';
import { TeacherWorkloadService } from './teacher-workload.service';
import { AppLogger } from '../../core/logger/logger.service';

describe('TeacherWorkloadController', () => {
    let controller: TeacherWorkloadController;
    let service: TeacherWorkloadService;

    const mockService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findByTeacher: jest.fn(),
        update: jest.fn(),
    };

    const mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TeacherWorkloadController],
            providers: [
                { provide: TeacherWorkloadService, useValue: mockService },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        controller = module.get<TeacherWorkloadController>(TeacherWorkloadController);
        service = module.get<TeacherWorkloadService>(TeacherWorkloadService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
