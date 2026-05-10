import { Test, TestingModule } from '@nestjs/testing';
import { SubstitutionService } from './substitution.service';
import { SubstitutionRepository } from './repository/substitution.repository';
import { AppLogger } from '../../core/logger/logger.service';

describe('SubstitutionService', () => {
    let service: SubstitutionService;
    let repository: SubstitutionRepository;

    const mockRepository = {
        create: jest.fn(),
        findAll: jest.fn(),
        findById: jest.fn(),
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
                SubstitutionService,
                { provide: SubstitutionRepository, useValue: mockRepository },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<SubstitutionService>(SubstitutionService);
        repository = module.get<SubstitutionRepository>(SubstitutionRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
