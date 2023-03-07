import { Controller, Get, Param } from '@nestjs/common';
import { OrderSeatsService } from '../services/order-seats.service';

@Controller('order-seats')
export class OrderSeatsController {
  constructor(private readonly orderSeatsService: OrderSeatsService) {}

  @Get('/:contentId')
  async getAContent(@Param('contentId') contentId: number) {
    const content = await this.orderSeatsService.getAContent(contentId);

    return content;
  }
  //현재 미사용 URI
  @Get('/:contentId/timeSale')
  async getCurrentTimeSale(@Param('contentId') contentId: number) {
    const content = await this.orderSeatsService.getCurrentTimeSale(contentId);

    return content;
  }
}
