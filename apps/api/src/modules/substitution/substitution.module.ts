import { Module } from '@nestjs/common';
import { SubstitutionService } from './substitution.service';
import { SubstitutionController } from './substitution.controller';

@Module({
  providers: [SubstitutionService],
  controllers: [SubstitutionController]
})
export class SubstitutionModule {}
