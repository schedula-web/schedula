import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsService } from './analytics.service';
import { AnalyticsRepository } from './repository/analytics.repository';
import { AppLogger } from '../../core/logger/logger.service';

describe('AnalyticsService', () => {
    let service: AnalyticsService;
    let repository: AnalyticsRepository;

    const mockRepository = {
        findBySchedulaId: jest.fn(),
        updateAnalytics: jest.fn(),
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
                AnalyticsService,
                { provide: AnalyticsRepository, useValue: mockRepository },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        service = module.get<AnalyticsService>(AnalyticsService);
        repository = module.get<AnalyticsRepository>(AnalyticsRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
