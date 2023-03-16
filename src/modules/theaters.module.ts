import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TheatersController } from 'src/controllers/theaters.controller';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { Theater } from 'src/entities/theater-info.entity';
import { PriceInfo } from 'src/entities/theater-price.entity';
import { SeatsInfo } from 'src/entities/theater-seats.entity';
import { TheatersService } from 'src/services/theaters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Theater, SeatsInfo, PriceInfo, KopisApi]),
  ],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
