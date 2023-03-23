import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { UserController } from './render-user.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../static'),
      serveRoot: '/render-user',
    }),
  ],
  controllers: [UserController],
})
export class UserModule {}
// export class UserModule
// implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer.apply(AuthMiddleware).forRoutes('/');
//   }
// }
