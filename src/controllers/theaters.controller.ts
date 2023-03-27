import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreatePriceInfoDto } from 'src/dto/create-price-info.dto';
import { CreateSeatsInfoDto } from 'src/dto/create-seats-info.dto';
import { CreateTheaterDto } from 'src/dto/create-theater.dto';
import { TheatersService } from 'src/services/theaters.service';
import { Response, Request } from 'express';

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

  // @Get('/info')
  // async getAllTheaters() {
  //   return await this.theatersService.getAllTheaterInfo();
  // }

  @Get('/myList')
  async getMyTheaterInfo(@Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    return await this.theatersService.getMyTheaterInfo(userId);
  }

  @Get('/getTheaterId/:theaterName')
  async getTheaterIdByName(
    @Req() req: Request,
    @Param('theaterName') theaterName: string
  ) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    return await this.theatersService.getTheaterIdByName(theaterName, userId);
  }

  @Get('/getPerforms/:theaterName')
  async getMyTheaterPerforms(@Param('theaterName') theaterName: string) {
    console.log(theaterName);
    return await this.theatersService.getMyTheaterPerforms(theaterName);
  }

  @Get('/getPerformId/:performName')
  async getPerformId(@Param('performName') performName: string) {
    return await this.theatersService.getPerformId(performName);
  }

  @Post('/createTheater')
  createTheaterInfo(@Req() req: Request, @Body() data: CreateTheaterDto) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    this.theatersService.createTheaterInfo(data.theater, userId);
  }

  @Delete('/deleteTheater/:theaterId')
  deleteTheaterInfo(
    @Req() req: Request,
    @Param('theaterId') theaterId: number
  ) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    this.theatersService.deleteTheaterInfo(theaterId, userId);
  }

  @Get('/seatsList/:theaterId')
  async getSeatsInfoByTheaterId(@Param('theaterId') theaterId: number) {
    return await this.theatersService.getSeatsInfoByTheaterId(theaterId);
  }

  @Post('/createSeats')
  createSeatsInfo(@Req() req: Request, @Body() data: CreateSeatsInfoDto) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    // console.log(data);
    this.theatersService.createSeatsInfo(
      data.theaterId,
      data.maxRowIndex,
      data.maxColumnIndex,
      userId
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
  createPriceInfo(@Req() req: Request, @Body() data: CreatePriceInfoDto) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    this.theatersService.createPriceInfo(
      data.grade,
      data.price,
      data.performId,
      data.theaterId,
      userId
    );
  }

  @Delete('/deletePriceInfo/:performId')
  deletePriceInfo(@Param('performId') performId: string) {
    this.theatersService.deletePriceInfo(performId);
  }

  @Get('/printSeats/:theaterId')
  async printSeats(@Req() req: Request, @Param('theaterId') theaterId: number) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    // console.log(theaterId, userId);

    const seats = await this.theatersService.printSeats(theaterId, userId);

    return seats;
  }
}
