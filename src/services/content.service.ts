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

  // 검색페이지 검색 결과 불러오기 - 페이지네이션
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

  // perform table '공연중'인 공연정보 불러오기 - 페이지네이션
  async getAllPerformsToHome(limit, offset) {
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

  // content table의 모든 공연정보 불러오기 - 페이지네이션
  async getContentsToHome(limit, offset) {
    const performs = await this.contentRepository.findAndCount({
      order: { updatedAt: 'ASC' },
      skip: offset,
      take: limit,
      where: {
        deletedAt: null,
      },
    });
    return { performs };
  }

  // 퍼폼아이디로 공연정보 한개만 불러오기
  async getPerformById(performId) {
    const data = await this.performRepository.findOne({
      where: {
        deletedAt: null,
        performId,
      },
    });
    return { data };
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
}
