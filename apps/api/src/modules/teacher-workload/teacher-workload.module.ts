import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherWorkload, TeacherWorkloadSchema } from './schema/teacher-workload.schema';
import { TeacherWorkloadService } from './teacher-workload.service';
import { TeacherWorkloadController } from './teacher-workload.controller';
import { TeacherWorkloadRepository } from './repository/teacher-workload.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TeacherWorkload.name, schema: TeacherWorkloadSchema },
        ]),
    ],
    controllers: [TeacherWorkloadController],
    providers: [
        TeacherWorkloadService,
        TeacherWorkloadRepository,
    ],
    exports: [TeacherWorkloadService],
})
export class TeacherWorkloadModule { }
