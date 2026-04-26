import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { TimetableFormatService } from './timetable-format.service';
import { CreateTimetableFormatDto } from './dto/create-timetable-format.dto';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AppLogger } from '../../core/logger/logger.service';
import { UserRole } from '../../core/constants/enums';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('timetable-format')
export class TimetableFormatController {
    constructor(
        private readonly service: TimetableFormatService,
        private readonly logger: AppLogger,
    ) { }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    createFormat(
        @GetUser('schedulaId') schedulaId: string,
        @Body() dto: CreateTimetableFormatDto
    ) {
        this.logger.log('POST /timetable-format - Create Format', 'TimetableFormatController');
        return this.service.createFormat(dto, schedulaId);
    }

    @Get()
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    getFormats(@GetUser('schedulaId') schedulaId: string) {
        this.logger.log('GET /timetable-format - Get Formats', 'TimetableFormatController');
        return this.service.getFormats(schedulaId);
    }

    @Post('slot')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    createSlot(
        @GetUser('schedulaId') schedulaId: string,
        @Body() dto: CreateTimeSlotDto
    ) {
        this.logger.log('POST /timetable-format/slot - Create Time Slot', 'TimetableFormatController');
        return this.service.createTimeSlot(dto, schedulaId);
    }

    @Get('slot/:formatId')
    @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
    getSlots(@Param('formatId') formatId: string) {
        this.logger.log(`GET /timetable-format/slot/${formatId} - Get Slots`, 'TimetableFormatController');
        return this.service.getSlots(formatId);
    }
}