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
    });
  }

  async getMyPerforms(thtrId: string) {
    return await this.performRepository.find({
      where: { theaterCode: thtrId, deletedAt: null },
    });
  }

  createPerform(
    stdate: number,
    eddate: number,
    title: string,
    theater: string,
    theaterCode: string,
    genreCode: string,
    status: number
  ) {
    this.performRepository.insert({
      stdate,
      eddate,
      title,
      theater,
      theaterCode,
      genreCode,
      status,
    });
  }

  updatePerform(
    id: number,
    stdate: number,
    eddate: number,
    title: string,
    theater: string,
    theaterCode: string,
    genreCode: string,
    status: number
  ) {
    this.performRepository.update(id, {
      stdate,
      eddate,
      title,
      theater,
      theaterCode,
      genreCode,
      status,
    });
  }

  deletePerform(id: number) {
    this.performRepository.softDelete(id);
  }
}
