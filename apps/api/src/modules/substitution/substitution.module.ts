import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Substitution, SubstitutionSchema } from './schema/substitution.schema';
import { SubstitutionService } from './substitution.service';
import { SubstitutionController } from './substitution.controller';
import { SubstitutionRepository } from './repository/substitution.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Substitution.name, schema: SubstitutionSchema },
        ]),
    ],
    controllers: [SubstitutionController],
    providers: [
        SubstitutionService,
        SubstitutionRepository,
    ],
    exports: [SubstitutionService],
})
export class SubstitutionModule { }
