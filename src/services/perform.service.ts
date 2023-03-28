import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/entities/content.entity';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerformService {
  constructor(
    @InjectRepository(Content) private performRepository: Repository<Content>
  ) {}

  async getMyContents(performId: string, userId: number) {
    return await this.performRepository.find({
      where: { performId, userId, deletedAt: null },
      relations: ['kopisApi'],
      order: { performRound: 'ASC' },
    });
  }

  async getPerforms() {
    return await this.performRepository.find({
      where: { deletedAt: null },
      relations: ['kopisApi', 'users'],
    });
  }

  async getMyPerforms(userId: number) {
    const performList = await this.performRepository
      .createQueryBuilder('contents')
      .select('contents.performId')
      .addSelect('ka.performName')
      .leftJoin(KopisApi, 'ka', 'contents.performId = ka.performId')
      .groupBy('contents.performId, ka.performName')
      .where('contents.userId = :userId', { userId })
      .getRawMany();

    return performList;
  }

  async getMyTheatersByPerformId(performId: string, userId: number) {
    const theaterList = await this.performRepository
      .createQueryBuilder('contents')
      .select('contents.performId')
      .addSelect('ka.theater')
      .leftJoin(KopisApi, 'ka', 'contents.performId = ka.performId')
      .groupBy('contents.performId, ka.theater')
      .where('contents.userId = :userId AND contents.performId = :performId', {
        userId,
        performId,
      })
      .getRawMany();
    return theaterList;
  }

  createPerform(
    performId: string,
    performRound: number,
    performDate: string,
    performTime: string,
    userId: number
  ) {
    this.performRepository.insert({
      performId,
      performRound,
      performDate,
      performTime,
      userId,
    });
  }

  async updatePerform(
    id: number,
    performRound: number,
    performDate: string,
    performTime: string,
    userId: number // userId webtoken 으로 수정 필요
  ) {
    const currentContent = await this.performRepository.findOne({
      where: { id, deletedAt: null },
      select: ['performId'],
    });

    const performId = currentContent.performId;
    //console.log(performId);
    this.performRepository.update(id, {
      performId,
      performRound,
      performDate,
      performTime,
      userId,
    });
  }

  // delete user authorization 추가 필요
  deletePerform(id: string) {
    this.performRepository.softDelete(id);
  }
}
