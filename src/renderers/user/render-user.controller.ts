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
      // const userType = res.locals.user.userType;
      const loginTrue = { login: true };
      console.log('locals', res.locals);
      console.log('true', jwt);
      res.render('main.ejs', loginTrue);
      // if (userType === 1) {
      //   res.render('main.ejs', loginTrue);
      // } else if (userType === 2) {
      //   res.render('theater.ejs', loginTrue);
      // } else {
      //   alert('유효하지 않은 유저 타입입니다.')
      // }
    }
  }

  @Get('/search')
  async getSearch(@Res() res: Response, @Req() req: Request): Promise<any> {
    const jwt = req.cookies.jwt;
    if (!jwt) {
      const loginFalse = { login: false };
      console.log('false', jwt);
      res.render('search.ejs', loginFalse);
    } else {
      const loginTrue = { login: true };
      console.log('true', jwt);
      res.render('search.ejs', loginTrue);
    }
  }

  @Get('/login')
  async getLogin(@Res() res: Response, @Req() req: Request): Promise<any> {
    const jwt = req.cookies.jwt;
    if (!jwt) {
      const loginFalse = { login: false };
      console.log('false', jwt);
      res.render('login.ejs', loginFalse);
    } else {
      const loginTrue = { login: true };
      console.log('true', jwt);
      res.render('login.ejs', loginTrue);
    }
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
