import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { SubstitutionService } from './substitution.service';
import { CreateSubstitutionDto } from './dto/create-substitution.dto';
import { UpdateSubstitutionDto } from './dto/update-substitution.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AppLogger } from '../../core/logger/logger.service';
import { UserRole } from '../../core/constants/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('substitution')
export class SubstitutionController {
    constructor(
        private readonly service: SubstitutionService,
        private readonly logger: AppLogger,
    ) { }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    create(
        @GetUser('schedulaId') schedulaId: string,
        @Body() dto: CreateSubstitutionDto
    ) {
        this.logger.log('POST /substitution - Create Substitution', 'SubstitutionController');
        return this.service.create(dto, schedulaId);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    findAll(
        @GetUser('schedulaId') schedulaId: string,
        @Query('date') date?: string
    ) {
        this.logger.log('GET /substitution - Find All', 'SubstitutionController');
        return this.service.findAll(schedulaId, date);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    findOne(@Param('id') id: string) {
        this.logger.log(`GET /substitution/${id} - Find One`, 'SubstitutionController');
        return this.service.findOne(id);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    update(@Param('id') id: string, @Body() dto: UpdateSubstitutionDto) {
        this.logger.log(`PUT /substitution/${id} - Update Substitution`, 'SubstitutionController');
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    remove(@Param('id') id: string) {
        this.logger.log(`DELETE /substitution/${id} - Remove Substitution`, 'SubstitutionController');
        return this.service.remove(id);
    }
}
