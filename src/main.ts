import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new Logger());
  const config = new DocumentBuilder()
    .setTitle('Vila API')
    .setDescription('API para a avaliação BackEnd Vila')
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .addTag('superheroes')
    .addTag('powers')
    .addTag('attributes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();
