import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RenderContentModule } from './content/render-content.module';
import { RenderOrderSeatsModule } from './orderSeats/render-order-seats.module';
import { RouterController } from './router.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RenderOrderSeatsModule,
    RenderContentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../static'),
      serveRoot: '/router',
    }),
  ],
  controllers: [RouterController],
})
export class RouterModule {}
