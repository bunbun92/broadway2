import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateOrderSeatsDto } from 'src/dto/create-order-seats.dto';
import { DeleteOrderSeatsDto } from 'src/dto/delete-order-seats.dto';
import { UpdateOrderSeatsDto } from 'src/dto/update-order-seats.dto';
import { OrderSeatsService } from '../services/order-seats.service';
import { Response } from 'express';
import { DeleteOrderSeatsByContentIdDto } from 'src/dto/delete-order-seats-by-content-id.dto';

@Controller('order-seats')
export class OrderSeatsController {
  constructor(private readonly orderSeatsService: OrderSeatsService) {}

  @Get('/:performId/content') // url 이름 다시생각해보기
  async getContentsByPerformId(@Param('performId') performId: string) {
    const contents = await this.orderSeatsService.getContentsByPerformId(
      performId
    );

    return contents;
  }

  @Get('/content/:contentId')
  async getAContentByContentId(@Param('contentId') contentId: number) {
    const content = await this.orderSeatsService.getAContentByContentId(
      contentId
    );

    return content;
  }

  @Get('/:contentId/seats')
  async getAllSeatsOfAContent(
    @Param('contentId') contentId: number
    // @Res() res: Response
  ) {
    const seats = await this.orderSeatsService.getAllSeatsOfAContent(contentId);

    // return res.send(seats);
    return seats;
  }

  @Get('/:contentId/seatsWithMine')
  async getAllSeatsAndMySeatsOfAContent(@Param('contentId') contentId: number) {
    const userId = 1;

    const seats = await this.orderSeatsService.getAllSeatsOfAContent(contentId);
    const mySeats = await this.orderSeatsService.getReservedSeats(
      userId,
      contentId
    );

    return { seats, mySeats };
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
    @Body() data: CreateOrderSeatsDto
  ) {
    const userId = 1;
    const msg = await this.orderSeatsService.payReservedSeats(
      userId,
      contentId,
      data.seats
    );

    return msg;
  }

  @Patch('/:contentId/editReservedSeats')
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
  async releaseSeatsByIds(@Body() data: DeleteOrderSeatsDto) {
    const userId = 1;

    const msg = await this.orderSeatsService.releaseSeatsByIds(
      userId,
      data.orderListIds,
      [1, 2]
    );

    return msg;
  }

  @Delete('/releaseSeatsByContentId')
  async releaseSeatsByContentId(@Body() data: DeleteOrderSeatsByContentIdDto) {
    const userId = 1;

    const msg = await this.orderSeatsService.deleteSeatsByContentId(
      userId,
      data.contentId,
      [1, 2]
    );

    return msg;
  }

  @Delete('/deleteSeatsByContentId')
  async deleteSeatsByContentId(@Body() data: DeleteOrderSeatsByContentIdDto) {
    const userId = 1;

    const msg = await this.orderSeatsService.deleteSeatsByContentId(
      userId,
      data.contentId,
      [3]
    );

    return msg;
  }

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

  @Get('/processingReservations')
  async getAllProcessingReservations() {
    const userId = 1;
    const reservations =
      await this.orderSeatsService.getAllProcessingReservations(userId, [1, 2]);

    return reservations;
  }

  @Get('/reservedReservations')
  async getAllReservedReservations() {
    const userId = 1;
    const reservations =
      await this.orderSeatsService.getAllProcessingReservations(userId, [3]);

    return reservations;
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
