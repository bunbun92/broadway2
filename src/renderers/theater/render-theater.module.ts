import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RenderTheaterController } from './render-theater.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../static'),
      serveRoot: '/admin',
    }),
  ],
  controllers: [RenderTheaterController],
})
export class RenderTheaterModule {}
