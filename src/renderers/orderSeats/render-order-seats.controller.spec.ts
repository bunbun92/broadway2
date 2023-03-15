import { Test, TestingModule } from '@nestjs/testing';
import { RenderOrderSeatsController } from './render-order-seats.controller';

describe('RenderOrderSeatsController', () => {
  let controller: RenderOrderSeatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenderOrderSeatsController],
    }).compile();

    controller = module.get<RenderOrderSeatsController>(RenderOrderSeatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
