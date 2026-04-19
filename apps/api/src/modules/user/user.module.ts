import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './repository/user.repository';
import { SchedulaIdGeneratorService } from './helpers/schedula-id-generator.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UserService, UserRepository, SchedulaIdGeneratorService],
  controllers: [UserController],
  exports: [UserService, UserRepository] // Export both
})
export class UserModule { }