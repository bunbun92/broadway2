import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KopisApi } from '../entities/kopisApi.entity';
import { Repository } from 'typeorm';

@Injectable()
export class KopisApiService {
  constructor(
    @InjectRepository(KopisApi) private kopisApiRepository: Repository<KopisApi>
  ) {}

  async kopisCreate(kopisApiResult): Promise<KopisApi | string> {
    console.log(kopisApiResult);

    return await this.kopisApiRepository.save(kopisApiResult);
  }
}

// 1. json  변환/ | json api
// 2. save
// 3. 벌크 insert check
