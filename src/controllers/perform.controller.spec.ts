import { Test, TestingModule } from '@nestjs/testing';
import { PerformController } from './perform.controller';

describe('PerformController', () => {
  let controller: PerformController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformController],
    }).compile();

    controller = module.get<PerformController>(PerformController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
