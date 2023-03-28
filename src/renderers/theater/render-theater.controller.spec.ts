import { Test, TestingModule } from '@nestjs/testing';
import { RenderTheaterController } from './render-theater.controller';

describe('TheaterController', () => {
  let controller: RenderTheaterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenderTheaterController],
    }).compile();

    controller = module.get<RenderTheaterController>(RenderTheaterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
