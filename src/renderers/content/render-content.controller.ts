import { Controller, Get, Render } from '@nestjs/common';

@Controller('render-content')
export class RenderContentController {
  // @Get('/')
  // @Render('test4.ejs')
  // getTest4() {
  //   return { msg: 'test4용' };
  // }

  @Get('/?id=${performId}')
  @Render('detail.ejs')
  getDetail() {
    const searchParams = new URLSearchParams(location.search);
    const performId = searchParams.get('performId');
    console.log(performId);

    return { message: 'thank you!' };
  }
}
