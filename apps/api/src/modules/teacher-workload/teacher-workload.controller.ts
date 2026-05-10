import { Controller, Get, Post, Body, Param, Put, UseGuards } from '@nestjs/common';
import { TeacherWorkloadService } from './teacher-workload.service';
import { CreateTeacherWorkloadDto } from './dto/create-teacher-workload.dto';
import { UpdateTeacherWorkloadDto } from './dto/update-teacher-workload.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AppLogger } from '../../core/logger/logger.service';
import { UserRole } from '../../core/constants/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teacher-workload')
export class TeacherWorkloadController {
    constructor(
        private readonly service: TeacherWorkloadService,
        private readonly logger: AppLogger,
    ) { }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    create(
        @GetUser('schedulaId') schedulaId: string,
        @Body() dto: CreateTeacherWorkloadDto
    ) {
        this.logger.log('POST /teacher-workload - Create Workload', 'TeacherWorkloadController');
        return this.service.create(dto, schedulaId);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    findAll(@GetUser('schedulaId') schedulaId: string) {
        this.logger.log('GET /teacher-workload - Find All', 'TeacherWorkloadController');
        return this.service.findAll(schedulaId);
    }

    @Get(':teacherId')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    findByTeacher(@Param('teacherId') teacherId: string) {
        this.logger.log(`GET /teacher-workload/${teacherId} - Find By Teacher`, 'TeacherWorkloadController');
        return this.service.findByTeacher(teacherId);
    }

    @Put(':teacherId')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    update(@Param('teacherId') teacherId: string, @Body() dto: UpdateTeacherWorkloadDto) {
        this.logger.log(`PUT /teacher-workload/${teacherId} - Update Workload`, 'TeacherWorkloadController');
        return this.service.update(teacherId, dto);
    }
}
