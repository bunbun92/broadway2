import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { TimeSaleController } from 'src/controllers/time-sale.controller';
import { TimeSale } from 'src/entities/time-sale.entity';
import { TimeSaleService } from 'src/services/time-sale.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeSale]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [TimeSaleController],
  providers: [TimeSaleService],
})
export class TimeSaleModule {}
