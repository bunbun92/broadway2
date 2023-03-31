import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from 'src/config/jwt.config.service';
import { Content } from 'src/entities/content.entity';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { ContentController } from '../controllers/content.controller';
import { ContentService } from '../services/content.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Content, KopisApi]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useClass: JwtConfigService,
      inject: [ConfigService],
    }),
  ],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
