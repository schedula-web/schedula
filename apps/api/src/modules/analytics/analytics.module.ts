import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Analytics, AnalyticsSchema } from './schema/analytics.schema';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsRepository } from './repository/analytics.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Analytics.name, schema: AnalyticsSchema },
        ]),
    ],
    controllers: [AnalyticsController],
    providers: [
        AnalyticsService,
        AnalyticsRepository,
    ],
    exports: [AnalyticsService],
})
export class AnalyticsModule { }
