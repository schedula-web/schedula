import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Timetable, TimetableSchema } from './schema/timetable.schema';
import { TimetableEntry, TimetableEntrySchema } from './schema/timetable-entry.schema';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TimetableRepository } from './repository/timetable.repository';
import { TimetableEntryRepository } from './repository/timetable-entry.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Timetable.name, schema: TimetableSchema },
            { name: TimetableEntry.name, schema: TimetableEntrySchema },
        ]),
    ],
    controllers: [TimetableController],
    providers: [
        TimetableService,
        TimetableRepository,
        TimetableEntryRepository,
    ],
    exports: [TimetableService],
})
export class TimetableModule { }
