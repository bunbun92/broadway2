import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreatePriceInfoDto } from 'src/dto/create-price-info.dto';
import { CreateSeatsInfoDto } from 'src/dto/create-seats-info.dto';
import { CreateTheaterDto } from 'src/dto/create-theater.dto';
import { TheatersService } from 'src/services/theaters.service';
import { Request } from 'express';

@Controller('theaters')
export class TheatersController {
  constructor(
    private readonly theatersService: TheatersService,
    private jwtService: JwtService
  ) {}

  @Get('/')
  async getAllTheaterList() {
    return await this.theatersService.getAllTheaterList();
  }

  @Get('/info')
  async getAllTheaters() {
    return await this.theatersService.getAllTheaterInfo();
  }

  @Get('/myList')
  async getMyTheaterInfo(@Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    return await this.theatersService.getMyTheaterInfo(userId);
  }

  @Post('/createTheater')
  createTheaterInfo(@Req() req: Request, @Body() data: CreateTheaterDto) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    this.theatersService.createTheaterInfo(data.theater, userId);
  }

  @Delete('/deleteTheater/:theaterId')
  deleteTheaterInfo(@Param('theaterId') theaterId: number) {
    this.theatersService.deleteTheaterInfo(theaterId);
  }

  @Get('/seatsList/:theaterId')
  async getSeatsInfoByTheaterId(@Param('theaterId') theaterId: number) {
    return await this.theatersService.getSeatsInfoByTheaterId(theaterId);
  }

  @Post('/createSeats')
  createSeatsInfo(@Body() data: CreateSeatsInfoDto) {
    this.theatersService.createSeatsInfo(
      data.theaterId,
      data.userId,
      data.rowMax,
      data.columnMax
    );
  }

  @Delete('/deleteSeats/:theaterId')
  deleteSeatsInfo(@Param('theaterId') theaterId: number) {
    this.theatersService.deleteSeatsInfo(theaterId);
  }

  @Get('/priceInfo/:performId')
  async getPriceInfoByPerformId(@Param('performId') performId: string) {
    return await this.theatersService.getPriceInfoByPerformId(performId);
  }

  @Post('/createPriceInfo')
  createPriceInfo(@Body() data: CreatePriceInfoDto) {
    this.theatersService.createPriceInfo(
      data.grade,
      data.price,
      data.performId,
      data.theaterId,
      data.userId
    );
  }

  @Delete('/deletePriceInfo/:performId')
  deletePriceInfo(@Param('performId') performId: string) {
    this.theatersService.deletePriceInfo(performId);
  }
}
