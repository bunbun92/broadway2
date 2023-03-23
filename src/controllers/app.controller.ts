import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
