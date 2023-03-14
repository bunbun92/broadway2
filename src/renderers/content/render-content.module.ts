import { Module } from '@nestjs/common';
import { RenderContentController } from './render-content.controller';

@Module({
  controllers: [RenderContentController]
})
export class RenderContentModule {}
