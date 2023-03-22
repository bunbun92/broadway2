import { Module } from '@nestjs/common';
import { RenderTheaterController } from './render-theater.controller';

@Module({
  controllers: [RenderTheaterController],
})
export class RenderTheaterModule {}
