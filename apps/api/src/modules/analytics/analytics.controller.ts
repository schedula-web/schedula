import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AppLogger } from '../../core/logger/logger.service';
import { UserRole } from '../../core/constants/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(
        private readonly service: AnalyticsService,
        private readonly logger: AppLogger,
    ) { }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    getAnalytics(@GetUser('schedulaId') schedulaId: string) {
        this.logger.log('GET /analytics - Get Metrics', 'AnalyticsController');
        return this.service.getAnalytics(schedulaId);
    }

    @Post('update')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    update(
        @GetUser('schedulaId') schedulaId: string,
        @Body() dto: CreateAnalyticsDto
    ) {
        this.logger.log('POST /analytics/update - Update Metrics', 'AnalyticsController');
        return this.service.updateAnalytics(schedulaId, dto);
    }
}
