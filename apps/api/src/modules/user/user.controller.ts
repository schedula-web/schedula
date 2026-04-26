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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../core/constants/enums';
import { AppLogger } from '../../core/logger/logger.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: AppLogger,
  ) {}

  // ✅ PUBLIC only for signup
  @Public()
  @Post()
  create(@Body() dto: CreateUserDto) {
    this.logger.log('POST /users - Create User', 'UserController');
    return this.userService.create(dto);
  }

  // 🔐 Protected
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get()
  findAll() {
    this.logger.log('GET /users - Find All Users', 'UserController');
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`GET /users/${id} - Find One User`, 'UserController');
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    this.logger.log(`PATCH /users/${id} - Update User`, 'UserController');
    return this.userService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.warn(`DELETE /users/${id} - Remove User`, 'UserController');
    return this.userService.remove(id);
  }
}