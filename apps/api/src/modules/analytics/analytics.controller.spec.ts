import { Test, TestingModule } from '@nestjs/testing';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AppLogger } from '../../core/logger/logger.service';

describe('AnalyticsController', () => {
    let controller: AnalyticsController;
    let service: AnalyticsService;

    const mockService = {
        getAnalytics: jest.fn(),
        updateAnalytics: jest.fn(),
    };

    const mockLogger = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AnalyticsController],
            providers: [
                { provide: AnalyticsService, useValue: mockService },
                { provide: AppLogger, useValue: mockLogger },
            ],
        }).compile();

        controller = module.get<AnalyticsController>(AnalyticsController);
        service = module.get<AnalyticsService>(AnalyticsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
