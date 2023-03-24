import { Controller, Get, Render } from '@nestjs/common';

@Controller('theater')
export class RenderTheaterController {
  @Get('/create')
  @Render('theater.ejs')
  getTheaterList() {
    return;
  }
}
