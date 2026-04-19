import { Logger, Module } from '@nestjs/common';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ClassModule } from './modules/class/class.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { SubstitutionModule } from './modules/substitution/substitution.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import * as path from 'path';

@Module({
  imports: [
    // 🔥 CORRECT ENV LOADING (MONOREPO FIX)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.resolve(process.cwd(), '.env'),
        path.resolve(process.cwd(), 'apps/api/.env'),
      ],
    }),

    // 🔥 DATABASE CONNECTION (PROPER WAY)
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        console.log('✅ MONGO_URI:', uri); // debug log

        if (!uri) {
          throw new Error('❌ MONGO_URI is not defined');
        }

        return {
          uri,
        };
      },
    }),

    // 🔹 Feature Modules
    CoreModule,
    AuthModule,
    UserModule,
    TeacherModule,
    SubjectModule,
    ClassModule,
    TimetableModule,
    SubstitutionModule,
    AnalyticsModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD, // Tell NestJS: "Use this as a global guard"
      useClass: JwtAuthGuard, // Register the JWT gate
    },
    {
      provide: APP_GUARD, // Tell NestJS: "Use this as a global guard"
      useClass: RolesGuard, // Register the Role gate
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule { }