import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors();

  // You can still serve other static assets, just make sure you are not serving `index.html` by default.
  app.useStaticAssets(path.join(process.cwd(), 'public'), {
    // index: false, // Prevents serving index.html by default
  });

  await app.listen(3000);
}

bootstrap();
