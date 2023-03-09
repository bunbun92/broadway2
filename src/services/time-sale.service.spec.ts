import { Test, TestingModule } from '@nestjs/testing';
import { TimeSaleService } from './time-sale.service';

describe('TimeSaleService', () => {
  let service: TimeSaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeSaleService],
    }).compile();

    service = module.get<TimeSaleService>(TimeSaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
