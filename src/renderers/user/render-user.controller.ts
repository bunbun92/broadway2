import { Controller, Get, Render, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('render-user')
export class UserController {
  @Get('/home')
  async getMain(@Res() res: Response, @Req() req: Request): Promise<any> {
    const jwt = req.cookies.jwt;
    if (!jwt) {
      const loginFalse = { login: false };
      console.log('false', jwt);
      res.render('main.ejs', loginFalse);
    } else {
      const loginTrue = { login: true };
      console.log('true', jwt);
      res.render('main.ejs', loginTrue);
    }
  }

  @Get('/login')
  @Render('login.ejs')
  getLogin() {
    return { message: 'thank you!' };
  }

  @Get('/join')
  @Render('join.ejs')
  getSignup() {
    return { message: 'thank you!' };
  }

  @Get('/membership')
  @Render('membership.ejs')
  getUserUpdate() {
    return { message: 'thank you!' };
  }
}
