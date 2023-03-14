import { Controller, Get, Render } from '@nestjs/common';

@Controller('render-order-seats')
export class RenderOrderSeatsController {
  @Get('/')
  @Render('test2.ejs')
  getTest2() {
    return { msg: 'test2 입니다' };
  }

  @Get('/test3')
  @Render('test3.ejs')
  getTest3() {
    return { msg: 'test3요' };
  }
}
