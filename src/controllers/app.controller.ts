import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
  ) {}

  @Get('/')
  @Render('toHome.ejs')
  getMainToRenderUser() {
    return;
  }
  @Get('/auth')
  async getAuth(@Req() req: Request) {
    const jwt = req.cookies.jwt;
    console.log('토큰!', jwt);

    if (!jwt) {
      const userId = 0;

      return userId;
    } else {
      const userId = this.jwtService.verify(jwt)['id'];
      console.log('userId!', userId);

      return userId;
    }
  }
}
