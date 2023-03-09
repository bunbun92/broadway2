import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Content } from 'src/entities/content.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerformService {
  constructor(
    @InjectRepository(Content) private performRepository: Repository<Content>
  ) {}

  async getPerforms() {
    return await this.performRepository.find({
      where: { deletedAt: null },
      relations: ['kopisApi', 'users'],
    });
  }

  async getMyPerforms(userId: number) {
    return await this.performRepository.find({
      where: { userId, deletedAt: null },
      relations: ['kopisApi', 'users'],
    });
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
