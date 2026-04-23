import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Subject, SubjectSchema } from './schema/subject.schema';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { SubjectRepository } from './repository/subject.repository';

import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Subject.name, schema: SubjectSchema },
    ]),
    TeacherModule,
  ],
  controllers: [SubjectController],
  providers: [SubjectService, SubjectRepository],
  exports: [SubjectService, SubjectRepository],
})
export class SubjectModule {}