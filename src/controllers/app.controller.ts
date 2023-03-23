import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getHello')
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get()
  // @Render('main.ejs')
  // getMain() {
  //   return { message: 'thank you!' };
  // }

  // @Get('/login')
  // @Render('login.ejs')
  // getLogin() {
  //   return { message: 'thank you!' };
  // }

  // @Get('/join')
  // @Render('join.ejs')
  // getSignup() {
  //   return { message: 'thank you!' };
  // }
  // @Get()
  // getKopisApi(): string {
  //   return this.appService.getKopisApi();
  // }
}
