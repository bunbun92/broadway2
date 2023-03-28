import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RenderContentController } from './render-content.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../static'),
      serveRoot: '/render-content',
    }),
  ],
  controllers: [RenderContentController],
})
export class RenderContentModule {}
