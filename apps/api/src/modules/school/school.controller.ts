import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { AppLogger } from '../../core/logger/logger.service';

@Controller('schools')
export class SchoolController {
  constructor(
    private readonly service: SchoolService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  create(@Body() dto: CreateSchoolDto) {
    this.logger.log('POST /schools', 'SchoolController');
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    this.logger.log('GET /schools', 'SchoolController');
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}