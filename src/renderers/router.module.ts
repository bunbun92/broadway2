import { Module } from '@nestjs/common';
import { RenderOrderSeatsModule } from './orderSeats/render-order-seats.module';
import { RouterController } from './router.controller';

@Module({
  imports: [RenderOrderSeatsModule],
  controllers: [RouterController],
})
export class RouterModule {}
