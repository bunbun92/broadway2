import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Content } from 'src/entities/content.entity';
import { User } from 'src/entities/user.entity';
import { OrderList } from 'src/entities/order-list.entity';
import { Seat } from 'src/entities/seats.entity';
import { TimeSale } from 'src/entities/time-sale.entity';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { Review } from 'src/entities/review.entity';
import { Comment } from 'src/entities/comment.entity';
import { Like } from 'src/entities/like.entity';
import { PriceInfo } from 'src/entities/theater-price.entity';
import { SeatsInfo } from 'src/entities/theater-seats.entity';
import { Theater } from 'src/entities/theater-info.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME'),
      entities: [
        Content,
        User,
        Seat,
        OrderList,
        TimeSale,
        KopisApi,
        Review,
        Comment,
        Like,
        Theater,
        SeatsInfo,
        PriceInfo,
      ],
      synchronize: false,
    };
  }
}
