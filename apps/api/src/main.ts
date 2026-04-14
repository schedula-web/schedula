import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validationPipe } from './common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
app.enableCors({
    origin: "http://localhost:3000",
  });

  await app.listen(3001);

  console.log('🚀 Server running on http://localhost:3001');
}

bootstrap();