import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { CreateTimeSaleDto } from 'src/dto/create-time-sale.dto';
import { UpdateTimeSaleDto } from 'src/dto/update-time-sale.dto';
import { TimeSaleService } from 'src/services/time-sale.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('time-sale')
export class TimeSaleController {
  constructor(
    private readonly timeSaleService: TimeSaleService,
    private jwtService: JwtService
  ) {}

  @Get('/getAllTimesale')
  async getTimeSaleInfo() {
    return await this.timeSaleService.getTimeSaleInfo();
  }

  @Get('/getTimesale/:contentId')
  async getTimeSaleInfoByContentId(@Param('contentId') contentId: number) {
    return await this.timeSaleService.getTimeSaleInfoByContentId(contentId);
  }

  @Post('/create/:contentId')
  createTimeSale(
    @Req() req: Request,
    @Param('contentId') contentId: number,
    @Body() data: CreateTimeSaleDto
  ) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    return this.timeSaleService.createTimeSale(
      contentId,
      data.startTime,
      data.endTime,
      data.rate,
      userId
    );
  }

  @Put('/timesale/:timeSaleId/:contentId/:userId')
  updateTimeSale(
    @Param('timeSaleId') timeSaleId: number,
    @Param('contentId') contentId: number,
    @Param('userId') userId: number,
    @Body() data: UpdateTimeSaleDto
  ) {
    return this.timeSaleService.updateTimeSale(
      timeSaleId,
      contentId,
      data.startTime,
      data.endTime,
      data.rate,
      userId
    );
  }

  @Delete('/timesale/:timeSaleId/:userId')
  deleteTimeSale(
    @Param('timeSaleId') timeSaleId: number,
    @Param('userId') userId: number
  ) {
    return this.timeSaleService.deleteTimeSale(timeSaleId, userId);
  }
}
