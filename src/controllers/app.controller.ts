import { Controller, Get, Render, Res, Req, Post } from '@nestjs/common';
import { join } from 'path';
import { AppService } from '../services/app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/getHello')
  getHello(): string {
    return this.appService.getHello();
  }
}
