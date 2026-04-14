import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        console.log('🔥 DB URI:', uri);

        if (!uri) {
          throw new Error('MONGO_URI missing');
        }

        return { uri };
      },
    }),
  ],
})
export class DatabaseModule {}