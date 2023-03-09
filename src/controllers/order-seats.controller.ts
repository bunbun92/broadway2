import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderSeatsDto } from 'src/dto/create-order-seats.dto';
import { UpdateOrderSeatsDto } from 'src/dto/update-order-seats.dto';
import { OrderSeatsService } from '../services/order-seats.service';

@Controller('order-seats')
export class OrderSeatsController {
  constructor(private readonly orderSeatsService: OrderSeatsService) {}

  @Get('/:contentId')
  async getAContent(@Param('contentId') contentId: number) {
    const content = await this.orderSeatsService.getAContent(contentId);

    return content;
  }

  @Get('/:contentId&:performInfo/seats')
  async getAllSeatsOfAContent(
    @Param('contentId') contentId: number,
    @Param('performInfo') performInfo: number
  ) {
    const seats = await this.orderSeatsService.getAllSeatsOfAContent(
      contentId,
      performInfo
    );

    return seats;
  }

  @Post('/:contentId&:performInfo/seatsRTWP')
  async seatsReservationTemporarilyWhilePay(
    @Param('contentId') contentId: number,
    @Param('performInfo') performInfo: number,
    @Body() data: CreateOrderSeatsDto
  ) {
    const userId = 1;
    const msg =
      await this.orderSeatsService.seatsReservationTemporarilyWhilePay(
        userId,
        contentId,
        performInfo,
        data.seats
      );

    return msg;
  }

  @Get('/:contentId&:performInfo/reservedSeats')
  async getReservedSeats(
    @Param('contentId') contentId: number,
    @Param('performInfo') performInfo: number
  ) {
    const userId = 1;
    const seats = await this.orderSeatsService.getReservedSeats(
      userId,
      contentId,
      performInfo
    );

    return seats;
  }

  @Post('/:contentId&:performInfo/payReservedSeats')
  async paySeats(
    @Param('contentId') contentId: number,
    @Param('performInfo') performInfo: number,
    @Body() data: UpdateOrderSeatsDto
  ) {
    const userId = 1;
    const msg = await this.orderSeatsService.payReservedSeats(
      userId,
      contentId,
      performInfo,
      data.seats
    );

    return msg;
  }
  //현재 미사용 URI
  // @Get('/:contentId/timeSale')
  // async getCurrentTimeSale(@Param('contentId') contentId: number) {
  //   const content = await this.orderSeatsService.getCurrentTimeSale(contentId);

  //   return content;
  // }
}
