import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('render-content')
export class RenderContentController {
  // @Get('/')
  // @Render('test4.ejs')
  // getTest4() {
  //   return { msg: 'test4용' };
  // }

  @Get('/')
  async getDetail(@Res() res: Response, @Req() req: Request): Promise<any> {
    const jwt = req.cookies.jwt;
    if (!jwt) {
      const loginFalse = { login: false };
      console.log('false', jwt);
      res.render('detail.ejs', loginFalse);
    } else {
      const loginTrue = { login: true };
      console.log('true', jwt);
      res.render('detail.ejs', loginTrue);
    }
  }
}
