import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from './repository/analytics.repository';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { AppLogger } from '../../core/logger/logger.service';

@Injectable()
export class AnalyticsService {
    constructor(
        private readonly repository: AnalyticsRepository,
        private readonly logger: AppLogger,
    ) { }

    getAnalytics(schedulaId: string) {
        this.logger.log(`Fetching analytics for school: ${schedulaId}`, 'AnalyticsService');
        return this.repository.findBySchedulaId(schedulaId);
    }

    updateAnalytics(schedulaId: string, dto: CreateAnalyticsDto) {
        this.logger.log(`Updating analytics for school: ${schedulaId}`, 'AnalyticsService');
        return this.repository.updateAnalytics(schedulaId, dto);
    }

    trackSubstitution(schedulaId: string) {
        this.logger.log(`Tracking substitution event for school: ${schedulaId}`, 'AnalyticsService');
        return this.repository.incrementSubstitution(schedulaId);
    }
}
