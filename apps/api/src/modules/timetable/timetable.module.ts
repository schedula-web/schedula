import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Timetable, TimetableSchema } from './schema/timetable.schema';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { TimetableRepository } from './repository/timetable.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Timetable.name, schema: TimetableSchema },
    ]),
  ],
  controllers: [TimetableController],
  providers: [TimetableService, TimetableRepository],
})
export class TimetableModule {}