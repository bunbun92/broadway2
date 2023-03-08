import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformController } from 'src/controllers/perform.controller';
import { PerformService } from 'src/services/perform.service';
import { Content } from '../entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
  controllers: [PerformController],
  providers: [PerformService],
})
export class PerformModule {}
