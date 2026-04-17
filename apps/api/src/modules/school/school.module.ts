import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from './schema/school.schema';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { SchoolRepository } from './repository/school.repository';

@Module({
  imports: [
    // 📖 SCHEMA: Register the School model with Mongoose
    MongooseModule.forFeature([
      { name: School.name, schema: SchoolSchema },
    ]),
  ],
  controllers: [SchoolController],  //entry points
  providers: [SchoolService, SchoolRepository], //business logic
  exports: [SchoolService], //make available to other modules
})
export class SchoolModule { }