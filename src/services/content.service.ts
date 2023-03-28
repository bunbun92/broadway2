import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { take } from 'rxjs';
import { Content } from 'src/entities/content.entity';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { Repository } from 'typeorm';
import { Like } from 'typeorm';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content) private contentRepository: Repository<Content>,
    @InjectRepository(KopisApi) private performRepository: Repository<KopisApi>
  ) {}

  async getPerformsBySearch(limit, offset, search) {
    const performs = await this.performRepository.findAndCount({
      order: { updatedAt: 'ASC' },
      skip: offset,
      take: limit,
      where: {
        deletedAt: null,
        performName: Like('%' + search + '%'),
      },
    });
    console.log('서비스', search);
    console.log('서비스', typeof search);
    '%' + search + '%';
    console.log('서비스', '%' + search + '%');

    return { performs };
  }

  async getAllContentsToHome(limit, offset) {
    const performs = await this.performRepository.findAndCount({
      order: { updatedAt: 'ASC' },
      skip: offset,
      take: limit,
      where: {
        deletedAt: null,
        performStatus: '공연중',
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
