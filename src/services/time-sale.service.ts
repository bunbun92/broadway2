import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSale } from 'src/entities/time-sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeSaleService {
  constructor(
    @InjectRepository(TimeSale) private timeSaleRepository: Repository<TimeSale>
  ) {}

  async getTimeSaleInfo() {
    return await this.timeSaleRepository.find({
      where: { deletedAt: null },
      relations: ['contents', 'users'],
    });
  }

  async getTimeSaleInfoByContentId(contentId: number) {
    return await this.timeSaleRepository.findOne({
      where: { contentId, deletedAt: null },
      relations: ['contents'],
    });
  }

  createTimeSale(
    contentId: number,
    startTime: string,
    endTime: string,
    rate: number,
    userId: number
  ) {
    this.timeSaleRepository.insert({
      contentId,
      startTime,
      endTime,
      rate,
      userId,
    });
  }

  updateTimeSale(
    id: number,
    contentId: number,
    startTime: string,
    endTime: string,
    rate: number,
    userId: number
  ) {
    this.timeSaleRepository.update(id, {
      contentId,
      startTime,
      endTime,
      rate,
      userId,
    });
  }

  deleteTimeSale(id: number, userId: number) {
    this.timeSaleRepository.softDelete({
      id,
      userId,
    });
  }
}
