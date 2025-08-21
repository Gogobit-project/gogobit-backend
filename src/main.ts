import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function start() {
  const app = await NestFactory.create(AppModule);
  // ambil instance ConfigService dari Nest container
  const configService = app.get(ConfigService);

  // ambil PORT dari .env (fallback ke 3001)
  const port = configService.get<number>('PORT') ?? 3001;
  await app.listen(port);
  console.log(`App running on http://localhost:${port}`);
}

void start();
