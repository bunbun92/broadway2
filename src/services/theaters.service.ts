import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KopisApi } from 'src/entities/kopisApi.entity';
import { Theater } from 'src/entities/theater-info.entity';
import { PriceInfo } from 'src/entities/theater-price.entity';
import { SeatsInfo } from 'src/entities/theater-seats.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater) private theaterRepository: Repository<Theater>,
    @InjectRepository(PriceInfo)
    private priceInfoRepository: Repository<PriceInfo>,
    @InjectRepository(SeatsInfo)
    private seatsInfoRepository: Repository<SeatsInfo>,
    @InjectRepository(KopisApi) private kopisApiRepository: Repository<KopisApi>
  ) {}

  async getAllTheaterInfo() {
    return await this.theaterRepository.find({
      where: { deletedAt: null },
      relations: ['users'],
    });
  }

  async getMyTheaterInfo(userId: number) {
    return await this.theaterRepository.find({
      where: { userId, deletedAt: null },
      relations: ['users'],
    });
  }

  async getAllTheaterList() {
    const theaterList = await this.kopisApiRepository
      .createQueryBuilder('kopisApi')
      .select('DISTINCT(kopisApi.theater)', 'theater')
      .orderBy('theater')
      .getRawMany();

    return theaterList.map(theater => theater.theater);
  }

  createTheaterInfo(theater: string, userId: number) {
    this.theaterRepository.insert({ theater, userId });
  }

  deleteTheaterInfo(id: number) {
    this.theaterRepository.softDelete({ id });
  }

  async getSeatsInfoByTheaterId(theaterId: number) {
    return await this.seatsInfoRepository.find({
      where: { theaterId, deletedAt: null },
      order: { seat: 'ASC' },
    });
  }

  createSeatsInfo(
    theaterId: number,
    userId: number,
    rowMax: number,
    columnMax: number
  ) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    for (let i = 0; i < rowMax; i++) {
      for (let j = 0; j < columnMax; j++) {
        const rowIndex = alphabet[i];
        const formattedColumnIndex = j < 9 ? `0${j + 1}` : `${j + 1}`;
        const seat = `${rowIndex}${formattedColumnIndex}`;

        this.seatsInfoRepository.insert({
          theaterId,
          seat,
          userId,
        });
      }
    }
  }

  deleteSeatsInfo(theaterId: number) {
    this.seatsInfoRepository.softDelete({ theaterId });
  }

  async getPriceInfoByPerformId(performId) {
    return await this.priceInfoRepository.find({
      where: { performId, deletedAt: null },
      relations: ['kopisApi'],
    });
  }

  createPriceInfo(
    grade: number,
    price: number,
    performId: string,
    theaterId: number,
    userId: number
  ) {
    this.priceInfoRepository.insert({
      grade,
      price,
      performId,
      theaterId,
      userId,
    });
  }

  deletePriceInfo(performId: string) {
    this.priceInfoRepository.softDelete({ performId });
  }
}
