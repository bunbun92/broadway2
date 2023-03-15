import { Module } from '@nestjs/common';
import { RenderOrderSeatsController } from './render-order-seats.controller';

@Module({
  controllers: [RenderOrderSeatsController]
})
export class RenderOrderSeatsModule {}
