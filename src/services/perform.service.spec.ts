import { Test, TestingModule } from '@nestjs/testing';
import { PerformService } from './perform.service';

describe('PerformService', () => {
  let service: PerformService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformService],
    }).compile();

    service = module.get<PerformService>(PerformService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
