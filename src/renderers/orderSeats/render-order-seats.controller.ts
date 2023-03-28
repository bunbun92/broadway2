import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('render-order-seats')
export class RenderOrderSeatsController {
  @Get('/checkAlreadyReserved')
  @Render('orderSeatsCheckAlreadyReserved.ejs')
  getOrderSeatsCheckAlreadyReserved() {
    return;
  }

  @Get('/chooseSeats')
  @Render('orderSeatsChooseSeats.ejs')
  getOrderSeatsChooseSeats() {
    return;
  }

  @Get('/editSeats')
  @Render('orderSeatsEditSeats.ejs')
  getOrderSeatsEditSeats() {
    return;
  }

  @Get('/paySeats')
  @Render('orderSeatsPaySeats.ejs')
  getOrderSeatsPaySeats() {
    return;
  }

  @Get('/processingSeats')
  @Render('orderSeatsProcessingSeats.ejs')
  getOrderSeatsProcessingSeats(@Res() res: Response) {
    console.log('fff' + res.locals.user.id);
    return;
  }

  @Get('/reservedSeats')
  @Render('orderSeatsReservedSeats.ejs')
  getOrderSeatsReservedSeats() {
    return;
  }

  @Get('/paidOrders')
  @Render('orderSeatsPaidOrders.ejs')
  getOrderSeatsPaidOrders() {
    return;
  }

  @Get('/performRoundList')
  @Render('orderSeatsPerformRoundList.ejs')
  getOrderSeatsPerformRoundList() {
    return;
  }
}
