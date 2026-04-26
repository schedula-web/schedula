import 'reflect-metadata';
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
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(json({ limit: '50mb', type: ['application/json', 'text/plain'] }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.useGlobalPipes(validationPipe);

  app.enableCors({
    origin: "http://localhost:3000",
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();