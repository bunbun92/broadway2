import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { _ } from 'lodash';
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

  // async getAllTheaterInfo() {
  //   return await this.theaterRepository.find({
  //     where: { deletedAt: null },
  //     relations: ['users'],
  //   });
  // }

  async getMyTheaterInfo(userId: number) {
    return await this.theaterRepository.find({
      where: { userId, deletedAt: null },
      relations: ['users'],
    });
  }

  async getTheaterIdByName(theater: string, userId: number) {
    return await this.theaterRepository.findOne({
      where: { theater, userId },
      select: ['id'],
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

  async getMyTheaterPerforms(theaterName: string) {
    const performList = await this.kopisApiRepository
      .createQueryBuilder('kopisApi')
      .select('DISTINCT(kopisApi.performName)', 'performName')
      .where({ theater: theaterName })
      .orderBy('performName')
      .getRawMany();

    return performList.map(performName => performName.performName);
  }

  async getPerformId(performName: string) {
    return await this.kopisApiRepository.findOne({
      where: { performName },
      select: ['performId', 'startDate', 'endDate'],
    });
  }

  async createTheaterInfo(theater: string, userId: number) {
    const theaterInDB = await this.theaterRepository.findOne({
      where: { theater, userId, deletedAt: null },
    });

    console.log(theater, userId);
    console.log(theaterInDB);

    if (_.isNil(theaterInDB)) {
      this.theaterRepository.insert({ theater, userId });
    } else {
      throw new Error('이미 내 극장으로 등록되어 있습니다.');
    }
  }

  deleteTheaterInfo(id: number, userId: number) {
    this.theaterRepository.delete({ id, userId });
  }

  async getSeatsInfoByTheaterId(theaterId: number) {
    return await this.seatsInfoRepository.find({
      where: { theaterId, deletedAt: null },
      order: { seat: 'ASC' },
    });
  }

  async createSeatsInfo(
    theaterId: number,
    maxRowIndex: number,
    maxColumnIndex: number,
    userId: number
  ) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const seatsInDB = await this.seatsInfoRepository.find({
      where: { theaterId, userId, deletedAt: null },
      select: ['seat'],
    });

    console.log(theaterId, userId);
    console.log(seatsInDB);

    if (_.isEmpty(seatsInDB)) {
      for (let i = 0; i < maxRowIndex; i++) {
        for (let j = 0; j < maxColumnIndex; j++) {
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
    } else {
      throw new Error('이미 좌석 배치 정보가 등록된 극장입니다.');
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

  async checkPriceInfoInDB(performId, grade) {
    return await this.priceInfoRepository.find({
      where: { performId, grade, deletedAt: null },
      relations: ['kopisApi'],
    });
  }

  async createPriceInfo(
    grade: number,
    price: number,
    performId: string,
    theaterId: number,
    userId: number
  ) {
    const priceInfoInDB = await this.checkPriceInfoInDB(performId, grade);
    console.log(performId);
    console.log(priceInfoInDB);

    if (_.isEmpty(priceInfoInDB)) {
      this.priceInfoRepository.insert({
        grade,
        price,
        performId,
        theaterId,
        userId,
      });
    } else {
      throw new Error('이미 가격 정보가 등록된 공연입니다.');
    }
  }

  deletePriceInfo(performId: string) {
    this.priceInfoRepository.softDelete({ performId });
  }

  async printSeats(theaterId: number, userId: number) {
    return await this.seatsInfoRepository.find({
      where: { theaterId, userId, deletedAt: null },
      select: ['seat'],
      order: { seat: 'ASC' },
    });
  }
}
