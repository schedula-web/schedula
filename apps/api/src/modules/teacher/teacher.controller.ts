import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AppLogger } from '../../core/logger/logger.service';

@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly service: TeacherService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  create(@Body() dto: CreateTeacherDto) {
    this.logger.log('POST /teachers', 'TeacherController');
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    this.logger.log('GET /teachers', 'TeacherController');
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`GET /teachers/${id}`, 'TeacherController');
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    this.logger.log(`PATCH /teachers/${id}`, 'TeacherController');
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`DELETE /teachers/${id}`, 'TeacherController');
    return this.service.remove(id);
  }
}