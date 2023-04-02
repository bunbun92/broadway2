import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { TypeOrmConfigService } from '../config/typeorm.config.service';
import { ContentModule } from './content.module';
import { OrderSeatsModule } from './order-seats.module';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigService } from '../config/jwt.config.service';
import { AuthMiddleware } from '../auth/auth.middleware';
import { KopisApiModule } from './kopis-api.module';
import { PerformModule } from './perform.module';
import { ReviewModule } from './review.module';
import { TimeSaleModule } from './time-sale.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { ScheduleModule } from '@nestjs/schedule';
import { CommentModule } from './comment.module';
import { RouterModule } from '../renderers/router.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TheatersModule } from './theaters.module';
import { UserController } from 'src/renderers/user/render-user.controller';
import { ReviewController } from 'src/renderers/review/render-review.controller';
import { RenderOrderSeatsController } from 'src/renderers/orderSeats/render-order-seats.controller';
import { OrderSeatsController } from 'src/controllers/order-seats.controller';
import { CommentController } from 'src/controllers/comment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    ContentModule,
    UserModule,
    PerformModule,
    OrderSeatsModule,
    KopisApiModule,
    TimeSaleModule,
    ReviewModule,
    CommentModule,
    RouterModule,
    TheatersModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthMiddleware, UserController],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware);
//     // .forRoutes({ path: 'user/update', method: RequestMethod.PUT });
//   }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        RenderOrderSeatsController,
        OrderSeatsController,
        '/render-user/membership/',
        '/render-review/create',
        '/render-review/manage',
        { path: '/render-review/comment', method: RequestMethod.POST }
      );
    // .forRoutes('/user/logout');
    // '*'
    // { path: 'user/update', method: RequestMethod.PUT }
    // { path: '/', method: RequestMethod.GET }
    // ();
  }
}
