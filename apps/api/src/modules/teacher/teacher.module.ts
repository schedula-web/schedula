import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schema/teacher.schema';
import { TeacherService } from './teacher.service';
import { TeacherRepository } from './repository/teacher.repository';
import { TeacherController } from './teacher.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema }
    ]),
  ],
  controllers: [TeacherController],
  providers: [
    TeacherService,
    TeacherRepository
  ],
  exports: [
    TeacherService
  ],
})
export class TeacherModule {}