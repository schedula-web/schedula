import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Class, ClassSchema } from './schema/class.schema';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { ClassRepository } from './repository/class.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
})
export class ClassModule {}