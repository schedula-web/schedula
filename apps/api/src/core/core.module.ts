import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    AppConfigModule,   // 🔥 MUST COME FIRST
    DatabaseModule,
    LoggerModule,
  ],
  exports: [
    AppConfigModule,
    DatabaseModule,
    LoggerModule,
  ],
})
export class CoreModule {}