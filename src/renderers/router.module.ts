import { Module } from '@nestjs/common';
import { RenderContentModule } from './content/render-content.module';
import { RenderOrderSeatsModule } from './orderSeats/render-order-seats.module';
import { RouterController } from './router.controller';

@Module({
  imports: [RenderOrderSeatsModule, RenderContentModule],
  controllers: [RouterController],
})
export class RouterModule {}
