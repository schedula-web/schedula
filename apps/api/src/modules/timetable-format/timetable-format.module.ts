import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TimetableFormat, TimetableFormatSchema } from './schema/timetable-format.schema';
import { TimeSlot, TimeSlotSchema } from './schema/time-slot.schema';

import { TimetableFormatService } from './timetable-format.service';
import { TimetableFormatController } from './timetable-format.controller';

import { TimetableFormatRepository } from './repository/timetable-format.repository';
import { TimeSlotRepository } from './repository/time-slot.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: TimetableFormat.name, schema: TimetableFormatSchema },
            { name: TimeSlot.name, schema: TimeSlotSchema },
        ]),
    ],
    controllers: [TimetableFormatController],
    providers: [
        TimetableFormatService,
        TimetableFormatRepository,
        TimeSlotRepository,
    ],
})
export class TimetableFormatModule { }