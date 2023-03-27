import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { PerformController } from 'src/controllers/perform.controller';
import { PerformService } from 'src/services/perform.service';
import { Content } from '../entities/content.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [PerformController],
  providers: [PerformService],
})
export class PerformModule {}
