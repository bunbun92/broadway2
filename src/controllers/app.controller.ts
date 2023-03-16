import { Controller, Get, Render, Res, Req, Post } from '@nestjs/common';
import { join } from 'path';
import { AppService } from '../services/app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
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
  @Get('/getHello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/')
  @Render('main.ejs')
  getMain() {
    return { message: 'thank you!' };
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
