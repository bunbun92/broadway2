import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { TheatersController } from 'src/controllers/theaters.controller';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { Theater } from 'src/entities/theater-info.entity';
import { PriceInfo } from 'src/entities/theater-price.entity';
import { SeatsInfo } from 'src/entities/theater-seats.entity';
import { TheatersService } from 'src/services/theaters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Theater, SeatsInfo, PriceInfo, KopisApi]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
