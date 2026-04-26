import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserRole } from '../../core/constants/enums';
import { AppLogger } from '../../core/logger/logger.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  create(
    @Body() dto: CreateTeacherDto,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.log('POST /teachers - Create Teacher', 'TeacherController');
    return this.teacherService.create(dto, schedulaId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  findAll(@GetUser('schedulaId') schedulaId: string) {
    this.logger.log('GET /teachers - Find All Teachers', 'TeacherController');
    return this.teacherService.findAll(schedulaId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  findOne(
    @Param('id') id: string,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.log(`GET /teachers/${id} - Find One Teacher`, 'TeacherController');
    return this.teacherService.findOne(id, schedulaId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTeacherDto,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.log(`PATCH /teachers/${id} - Update Teacher`, 'TeacherController');
    return this.teacherService.update(id, dto, schedulaId);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  remove(
    @Param('id') id: string,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.warn(`DELETE /teachers/${id} - Remove Teacher`, 'TeacherController');
    return this.teacherService.remove(id, schedulaId);
  }
}