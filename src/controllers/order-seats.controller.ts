import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateOrderSeatsDto } from 'src/dto/create-order-seats.dto';
import { DeleteOrderSeatsDto } from 'src/dto/delete-order-seats.dto';
import { UpdateOrderSeatsDto } from 'src/dto/update-order-seats.dto';
import { OrderSeatsService } from '../services/order-seats.service';

@Controller('order-seats')
export class OrderSeatsController {
  constructor(private readonly orderSeatsService: OrderSeatsService) {}

  @Get('/:performId/content') // url 이름 다시생각해보기
  async getAContentByPerformId(@Param('performId') performId: string) {
    const content = await this.orderSeatsService.getAContentByPerformId(
      performId
    );

    return content;
  }

  @Get('/:contentId/seats')
  async getAllSeatsOfAContent(@Param('contentId') contentId: number) {
    const seats = await this.orderSeatsService.getAllSeatsOfAContent(contentId);

    return seats;
  }

  @Post('/:contentId/seatsRTWP')
  async seatsReservationTemporarilyWhilePay(
    @Param('contentId') contentId: number,
    @Body() data: CreateOrderSeatsDto
  ) {
    const userId = 1;
    const msg =
      await this.orderSeatsService.seatsReservationTemporarilyWhilePay(
        userId,
        contentId,
        data.seats
      );

    return msg;
  }

  @Get('/:contentId/reservedSeats')
  async getReservedSeats(@Param('contentId') contentId: number) {
    const userId = 1;
    const seats = await this.orderSeatsService.getReservedSeats(
      userId,
      contentId
    );

    return seats;
  }

  @Post('/:contentId/payReservedSeats')
  async payReservedSeats(
    @Param('contentId') contentId: number,
    @Body() data: UpdateOrderSeatsDto
  ) {
    const userId = 1;
    const msg = await this.orderSeatsService.payReservedSeats(
      userId,
      contentId,
      data.seats
    );

    return msg;
  }

  @Patch('/:contentId/editReservedSeats/')
  async editReservedSeats(
    @Param('contentId') contentId: number,
    @Body() data: UpdateOrderSeatsDto
  ) {
    const userId = 1;
    const msg = await this.orderSeatsService.editReservedSeats(
      userId,
      contentId,
      data.seatsBefore,
      data.seatsAfter
    );

    return msg;
  }

  @Delete('/deletePaidSeats')
  async deletePaidSeatsByIds(@Body() data: DeleteOrderSeatsDto) {
    const userId = 1;
    const msg = await this.orderSeatsService.deleteSeatsByIds(
      userId,
      data.orderListIds,
      [3]
    );

    return msg;
  }

  @Delete('/releaseSeats')
  async releaseSeatsById(@Body() data: DeleteOrderSeatsDto) {
    const userId = 1;

    const msg = await this.orderSeatsService.releaseSeatsById(
      userId,
      data.orderListIds,
      [1, 2]
    );

    return msg;
  }

  // @Delete('/releaseSeatsInterval/:seconds')
  // async releaseSeatsInterval(@Param('seconds') seconds: number) {
  //   const msg = await this.orderSeatsService.releaseSeatsInterval(seconds, [1]);

  //   return msg;
  // }

  @Get('/orders')
  async getAllOrders() {
    const userId = 1;
    const orders = await this.orderSeatsService.getAllOrders(userId);

    return orders;
  }

  @Get('/order/:orderId')
  async getAnOrder(@Param('orderId') orderId: number) {
    const userId = 1;
    const order = await this.orderSeatsService.getAnOrder(userId, orderId);

    return order;
  }

  //일정 주기로 선점 좌석 해제 평소엔 꺼놔야함
  // @Cron('*/10 * * * * *')
  // async releaseSeatsInterval() {
  //   const msg = await this.orderSeatsService.releaseSeatsInterval(900, [1]);
  //   console.log(msg);
  //   return;
  // }

  //현재 미사용 URI
  // @Get('/:contentId/timeSale')
  // async getCurrentTimeSale(@Param('contentId') contentId: number) {
  //   const content = await this.orderSeatsService.getCurrentTimeSale(contentId);

  //   return content;
  // }
}
