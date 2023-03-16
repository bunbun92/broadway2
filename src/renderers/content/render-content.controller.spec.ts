import { Test, TestingModule } from '@nestjs/testing';
import { RenderContentController } from './render-content.controller';

describe('RenderContentController', () => {
  let controller: RenderContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RenderContentController],
    }).compile();

    controller = module.get<RenderContentController>(RenderContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
