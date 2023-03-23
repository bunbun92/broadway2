import { Controller, Get, Render } from '@nestjs/common';

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
  getOrderSeatsProcessingSeats() {
    return;
  }
}
