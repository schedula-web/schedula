import { Test, TestingModule } from '@nestjs/testing';
import { TeacherWorkloadService } from './teacher-workload.service';
import { TeacherWorkloadRepository } from './repository/teacher-workload.repository';
import { AppLogger } from '../../core/logger/logger.service';

describe('TeacherWorkloadService', () => {
    let service: TeacherWorkloadService;
    let repository: TeacherWorkloadRepository;

    const mockRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findByTeacherId: jest.fn(),
        updateByTeacher: jest.fn(),
        incrementSubstitution: jest.fn(),
    };

    const mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TeacherWorkloadService,
                { provide: TeacherWorkloadRepository, useValue: mockRepository },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<TeacherWorkloadService>(TeacherWorkloadService);
        repository = module.get<TeacherWorkloadRepository>(TeacherWorkloadRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
