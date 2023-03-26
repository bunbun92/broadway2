import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReviewController } from './render-review.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../static'),
      serveRoot: '/render-review',
    }),
  ],
  controllers: [ReviewController],
})
export class ReviewModule {}
