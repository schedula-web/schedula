import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { AppLogger } from '../../core/logger/logger.service';

@UseGuards(AuthGuard('jwt'))
@Controller('classes')
export class ClassController {
  constructor(
    private readonly service: ClassService,
    private readonly logger: AppLogger,
  ) {}

  @Post()
  create(@Body() dto: CreateClassDto, @Req() req: Request) {
    this.logger.log('POST /classes - Create Class', 'ClassController');
    const user = req.user as any;
    return this.service.create(dto, user.schedulaId);
  }

  @Get()
  findAll(@Req() req: Request) {
    this.logger.log('GET /classes - Find All Classes', 'ClassController');
    const user = req.user as any;
    return this.service.findAll(user.schedulaId);
  }

  update(
    @Param('id') id: string,
    @Body() dto: UpdateClassDto,
    @Req() req: Request,
  ) {
    this.logger.log(`PATCH /classes/${id} - Update Class`, 'ClassController');
    const user = req.user as any;
    return this.service.update(id, dto, user.schedulaId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: Request) {
    this.logger.warn(`DELETE /classes/${id} - Remove Class`, 'ClassController');
    const user = req.user as any;
    return this.service.delete(id, user.schedulaId);
  }
}