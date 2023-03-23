import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from 'src/entities/content.entity';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { ContentController } from '../controllers/content.controller';
import { ContentService } from '../services/content.service';

@Module({
  imports: [TypeOrmModule.forFeature([Content, KopisApi])],
  controllers: [ContentController],
  providers: [ContentService],
})
export class ContentModule {}
