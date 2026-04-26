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
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserRole } from '../../core/constants/enums';
import { AppLogger } from '../../core/logger/logger.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('subjects')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  create(
    @Body() dto: CreateSubjectDto,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.log('POST /subjects - Create Subject', 'SubjectController');
    return this.subjectService.create(dto, schedulaId);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  findAll(@GetUser('schedulaId') schedulaId: string) {
    this.logger.log('GET /subjects - Find All Subjects', 'SubjectController');
    return this.subjectService.findAll(schedulaId);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  findOne(
    @Param('id') id: string,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.log(`GET /subjects/${id} - Find One Subject`, 'SubjectController');
    return this.subjectService.findOne(id, schedulaId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateSubjectDto,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.log(`PATCH /subjects/${id} - Update Subject`, 'SubjectController');
    return this.subjectService.update(id, dto, schedulaId);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  remove(
    @Param('id') id: string,
    @GetUser('schedulaId') schedulaId: string,
  ) {
    this.logger.warn(`DELETE /subjects/${id} - Remove Subject`, 'SubjectController');
    return this.subjectService.remove(id, schedulaId);
  }
}