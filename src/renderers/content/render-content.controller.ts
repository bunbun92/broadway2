import { Controller, Get, Render } from '@nestjs/common';

@Controller('render-content')
export class RenderContentController {
  @Get('/')
  @Render('test4.ejs')
  getTest4() {
    return { msg: 'test4용' };
  }
}
