import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './schema/teacher.schema';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './repository/teacher.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Teacher.name, schema: TeacherSchema },
    ]),
  ],
  providers: [TeacherService, TeacherRepository],
  controllers: [TeacherController],
  exports: [TeacherService, TeacherRepository],
})
export class TeacherModule {}