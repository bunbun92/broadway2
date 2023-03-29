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
import { DeleteOrderSeatsByOrderIdDto } from 'src/dto/delete-order-seats-by-order-id.dto';
import { CreateSeatDto } from 'src/dto/create-seat.dto';

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
  async getAllSeatsAndMySeatsOfAContent(
    @Param('contentId') contentId: number,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;

    const seats = await this.orderSeatsService.getAllSeatsOfAContent(contentId);
    const mySeats = await this.orderSeatsService.getReservedSeats(
      userId,
      contentId
    );

    return res.status(200).send({ seats, mySeats });
  }

  @Post('/:contentId/seatsRTWP')
  async seatsReservationTemporarilyWhilePay(
    @Param('contentId') contentId: number,
    @Body() data: CreateOrderSeatsDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;
    const msg =
      await this.orderSeatsService.seatsReservationTemporarilyWhilePay(
        userId,
        contentId,
        data.seats
      );

    return res.status(200).send(msg);
  }

  @Get('/:contentId/reservedSeats')
  async getReservedSeats(
    @Param('contentId') contentId: number,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;
    console.log(userId);
    const seats = await this.orderSeatsService.getReservedSeats(
      userId,
      contentId
    );

    console.log(seats);

    return res.status(200).send(seats);
  }

  @Post('/:contentId/payReservedSeats')
  async payReservedSeats(
    @Param('contentId') contentId: number,
    @Body() data: CreateOrderSeatsDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;
    const msg = await this.orderSeatsService.payReservedSeats(
      userId,
      contentId,
      data.seats
    );

    return res.status(200).send(msg);
  }

  @Patch('/:contentId/editReservedSeats')
  async editReservedSeats(
    @Param('contentId') contentId: number,
    @Body() data: UpdateOrderSeatsDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;
    const msg = await this.orderSeatsService.editReservedSeats(
      userId,
      contentId,
      data.seatsBefore,
      data.seatsAfter
    );

    return res.status(200).send(msg);
  }

  @Delete('/deletePaidSeats')
  async deletePaidSeatsByIds(
    @Body() data: DeleteOrderSeatsDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;
    const msg = await this.orderSeatsService.deleteSeatsByIds(
      userId,
      data.orderListIds,
      [3]
    );

    return res.status(200).send(msg);
  }

  @Delete('/releaseSeats')
  async releaseSeatsByIds(
    @Body() data: DeleteOrderSeatsDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;

    const msg = await this.orderSeatsService.releaseSeatsByIds(
      userId,
      data.orderListIds,
      [1, 2]
    );

    return res.status(200).send(msg);
  }

  @Delete('/releaseSeatsByContentId')
  async releaseSeatsByContentId(
    @Body() data: DeleteOrderSeatsByContentIdDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;

    const msg = await this.orderSeatsService.deleteSeatsByContentId(
      userId,
      data.contentId,
      [1, 2]
    );

    return res.status(200).send(msg);
  }

  @Delete('/deleteSeatsByOrderId')
  async deleteSeatsByOrderId(
    @Body() data: DeleteOrderSeatsByOrderIdDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;

    const msg = await this.orderSeatsService.deleteSeatsByOrderId(
      userId,
      data.orderId,
      [3]
    );

    return res.status(200).send(msg);
  }

  @Delete('/deleteSeatsByContentId')
  async deleteSeatsByContentId(
    @Body() data: DeleteOrderSeatsByContentIdDto,
    @Res() res: Response
  ) {
    const userId = res.locals.user.id;

    const msg = await this.orderSeatsService.deleteSeatsByContentId(
      userId,
      data.contentId,
      [3]
    );

    return res.status(200).send(msg);
  }

  @Get('/orders')
  async getAllOrders(@Res() res: Response) {
    const userId = res.locals.user.id;
    const orders = await this.orderSeatsService.getAllOrders(userId);

    return res.status(200).send(orders);
  }

  @Get('/order/:orderId')
  async getAnOrder(@Param('orderId') orderId: number, @Res() res: Response) {
    const userId = res.locals.user.id;
    const order = await this.orderSeatsService.getAnOrder(userId, orderId);

    return res.status(200).send(order);
  }

  @Get('/processingReservations')
  async getAllProcessingReservations(@Res() res: Response) {
    const userId = res.locals.user.id;
    const reservations =
      await this.orderSeatsService.getAllProcessingReservations(userId, [1, 2]);

    return res.status(200).send(reservations);
  }

  @Get('/reservedReservations')
  async getAllReservedReservations(@Res() res: Response) {
    const userId = res.locals.user.id;
    const reservations =
      await this.orderSeatsService.getAllReservedReservations(userId, [3]);

    return res.status(200).send(reservations);
  }

  @Post('/createSeat')
  createSeat(@Body() data: CreateSeatDto) {
    const seat = data.seat;
    const theater = data.theater;
    const contentId = data.contentId;
    const performInfo = data.performInfo;
    const price = data.price;
    const orderStatus = data.orderStatus;

    this.orderSeatsService.createSeat(
      seat,
      theater,
      contentId,
      performInfo,
      price,
      orderStatus
    );
  }

  // 일정 주기로 선점 좌석 해제 평소엔 꺼놔야함
  @Cron('*/10 * * * * *')
  async releaseSeatsInterval() {
    const msg = await this.orderSeatsService.releaseSeatsInterval(900, [1]);
    console.log(msg);
    return;
  }

  //현재 미사용 URI
  // @Get('/:contentId/timeSale')
  // async getCurrentTimeSale(@Param('contentId') contentId: number) {
  //   const content = await this.orderSeatsService.getCurrentTimeSale(contentId);

  //   return content;
  // }
}
