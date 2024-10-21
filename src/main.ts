import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './app/shared/module/config-module/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.getNumber('PORT'));
}
bootstrap();
