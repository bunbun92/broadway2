import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { join } from 'path';
import * as moment from 'moment-timezone';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useStaticAssets(join(__dirname, '..', 'static', 'styles'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const localTime = moment().tz('Asia/Seoul');
  console.log(localTime);

  // let now = new Date();
  // console.log(now);

  await app.listen(3000);
}
bootstrap();
