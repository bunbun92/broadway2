import { Controller, Get, Render } from '@nestjs/common';

@Controller('theater')
export class RenderTheaterController {
  @Get('/')
  @Render('theater.ejs')
  getTheaterList() {
    return;
  }
}
