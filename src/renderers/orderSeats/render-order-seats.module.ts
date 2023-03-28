import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RenderOrderSeatsController } from './render-order-seats.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../static'),
      serveRoot: '/render-order-seats',
    }),
  ],
  controllers: [RenderOrderSeatsController],
})
export class RenderOrderSeatsModule {}
