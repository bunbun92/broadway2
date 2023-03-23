import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RenderContentModule } from './content/render-content.module';
import { RenderOrderSeatsModule } from './orderSeats/render-order-seats.module';
import { RouterController } from './router.controller';
import { ReviewModule } from './review/render-review.module';
import { UserModule } from './user/render-user.module';
import { RenderTheaterModule } from './theater/render-theater.module';

@Module({
  imports: [
    RenderOrderSeatsModule,
    RenderTheaterModule,
    RenderContentModule,
    CommentModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../static'),
      serveRoot: '/router',
    }),
    UserModule,
    ReviewModule,
  ],
  controllers: [RouterController],
})
export class RouterModule {}
