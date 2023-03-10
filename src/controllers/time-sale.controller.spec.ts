import { Test, TestingModule } from '@nestjs/testing';
import { TimeSaleController } from './time-sale.controller';

describe('TimeSaleController', () => {
  let controller: TimeSaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeSaleController],
    }).compile();

    controller = module.get<TimeSaleController>(TimeSaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
