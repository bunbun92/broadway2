import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/entities/content.entity';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private contentRepository: Repository<Content>,
    @InjectRepository(KopisApi) private performRepository: Repository<KopisApi>
  ) {}

  async getAllperforms() {
    const performs = await this.performRepository.find({
      where: {
        deletedAt: null,
      },
    });
    return { performs };
  }

  async getAllContents() {
    return await { id: 1 };
  }

  async getOneContent() {
    const content = await this.performRepository.findOne({
      where: {
        deletedAt: null,
        performId: 'PF214620',
      },
    });
    return { content };
  }

  async getPerformById(performId) {
    const data = await this.performRepository.findOne({
      where: {
        deletedAt: null,
        performId,
      },
    });
    return { data };
  }
}
