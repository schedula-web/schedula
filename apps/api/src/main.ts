import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const envPath = fs.existsSync(path.resolve(process.cwd(), '.env'))
  ? path.resolve(process.cwd(), '.env')
  : path.resolve(process.cwd(), 'apps/api/.env');

dotenv.config({ path: envPath }); // 🔥 FORCE LOAD ENV FIRST

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log('RAW ENV:', process.env.MONGO_URI); // ✅ now should work

  app.useGlobalPipes(validationPipe);

  app.enableCors({
    origin: "http://localhost:3000",
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();