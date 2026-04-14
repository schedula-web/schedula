import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';

@Controller('class')
export class ClassController {
  constructor(private service: ClassService) {}

  // 🔥 CREATE CLASS
  @Post()
  create(@Body() dto: CreateClassDto) {
    return this.service.create(dto);
  }

  // 🔥 GET ALL
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔥 GET BY ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }
}