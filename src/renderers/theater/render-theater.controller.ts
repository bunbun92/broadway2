import { Controller, Get, Render } from '@nestjs/common';

@Controller('Admin')
export class RenderTheaterController {
  @Get('/editTheater')
  @Render('adminTheater.ejs')
  adminEditTheater() {
    return;
  }

  @Get('/editContent')
  @Render('adminContent.ejs')
  adminEditContent() {
    return;
  }
}
