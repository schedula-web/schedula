import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './modules/auth/auth.module';
import { SchoolModule } from './modules/school/school.module';
import { UserModule } from './modules/user/user.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ClassModule } from './modules/class/class.module';
import { TimetableModule } from './modules/timetable/timetable.module';
import { SubstitutionModule } from './modules/substitution/substitution.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    // 🔥 CORRECT ENV LOADING (MONOREPO FIX)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env', // ✅ FIXED HERE
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
    AuthModule,
    SchoolModule,
    UserModule,
    TeacherModule,
    SubjectModule,
    ClassModule,
    TimetableModule,
    SubstitutionModule,
    AnalyticsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}