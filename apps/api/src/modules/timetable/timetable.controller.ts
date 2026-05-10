import { Controller, Post, Body, Get, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/create-timetable.dto';
import { UpdateTimetableDto } from './dto/update-timetable.dto';
import { CreateTimetableEntryDto } from './dto/create-timetable-entry.dto';
import { UpdateTimetableEntryDto } from './dto/update-timetable-entry.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AppLogger } from '../../core/logger/logger.service';
import { UserRole } from '../../core/constants/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('timetable')
export class TimetableController {
    constructor(
        private readonly service: TimetableService,
        private readonly logger: AppLogger,
    ) { }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    createTimetable(
        @GetUser('schedulaId') schedulaId: string,
        @Body() dto: CreateTimetableDto
    ) {
        this.logger.log('POST /timetable - Create Timetable', 'TimetableController');
        return this.service.createTimetable(dto, schedulaId);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    getTimetables(@GetUser('schedulaId') schedulaId: string) {
        this.logger.log('GET /timetable - Get Timetables', 'TimetableController');
        return this.service.getTimetables(schedulaId);
    }

    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    getTimetableById(@Param('id') id: string) {
        this.logger.log(`GET /timetable/${id} - Get Timetable`, 'TimetableController');
        return this.service.getTimetableById(id);
    }

    @Put(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    updateTimetable(@Param('id') id: string, @Body() dto: UpdateTimetableDto) {
        this.logger.log(`PUT /timetable/${id} - Update Timetable`, 'TimetableController');
        return this.service.updateTimetable(id, dto);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    deleteTimetable(@Param('id') id: string) {
        this.logger.log(`DELETE /timetable/${id} - Delete Timetable`, 'TimetableController');
        return this.service.deleteTimetable(id);
    }

    // Entry endpoints
    @Post('entry')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    createEntry(
        @GetUser('schedulaId') schedulaId: string,
        @Body() dto: CreateTimetableEntryDto
    ) {
        this.logger.log('POST /timetable/entry - Create Entry', 'TimetableController');
        return this.service.createEntry(dto, schedulaId);
    }

    @Get('entry/:timetableId')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    getEntries(@Param('timetableId') timetableId: string) {
        this.logger.log(`GET /timetable/entry/${timetableId} - Get Entries`, 'TimetableController');
        return this.service.getEntriesByTimetable(timetableId);
    }

    @Put('entry/:id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    updateEntry(@Param('id') id: string, @Body() dto: UpdateTimetableEntryDto) {
        this.logger.log(`PUT /timetable/entry/${id} - Update Entry`, 'TimetableController');
        return this.service.updateEntry(id, dto);
    }

    @Delete('entry/:id')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    deleteEntry(@Param('id') id: string) {
        this.logger.log(`DELETE /timetable/entry/${id} - Delete Entry`, 'TimetableController');
        return this.service.deleteEntry(id);
    }
}
