import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schema/class.schema';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { ClassRepository } from './repository/class.repository';

// ✅ ADD THESE IMPORTS
import { TeacherModule } from '../teacher/teacher.module';
import { SubjectModule } from '../subject/subject.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
    ]),

    // ✅ ADD THESE
    TeacherModule,
    SubjectModule,
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
  exports: [ClassService],
})
export class ClassModule {}