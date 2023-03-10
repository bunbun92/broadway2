import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSaleController } from 'src/controllers/time-sale.controller';
import { TimeSale } from 'src/entities/time-sale.entity';
import { TimeSaleService } from 'src/services/time-sale.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeSale])],
  controllers: [TimeSaleController],
  providers: [TimeSaleService],
})
export class TimeSaleModule {}
