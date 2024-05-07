import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useStaticAssets('public', {
    prefix: '/static',
  });
  // app.useStaticAssets({
  //   root: join(__dirname, '..', 'public'),
  //   prefix: '/static'
  // })
  await app.listen(3000);
}
bootstrap();
