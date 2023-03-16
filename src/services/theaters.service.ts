import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private seatsInfoRepository: Repository<SeatsInfo>
  ) {}

  async getAllTheaters() {
    return await this.theaterRepository.find({
      where: { deletedAt: null },
      relations: ['users'],
    });
  }
}
