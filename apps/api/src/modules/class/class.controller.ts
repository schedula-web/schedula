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

@UseGuards(AuthGuard('jwt'))
@Controller('classes')
export class ClassController {
  constructor(private readonly service: ClassService) {}

  @Post()
  create(@Body() dto: CreateClassDto, @Req() req: Request) {
    const user = req.user as any;
    return this.service.create(dto, user.schedulaId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as any;
    return this.service.findAll(user.schedulaId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateClassDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.service.update(id, dto, user.schedulaId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.service.delete(id, user.schedulaId);
  }
}