import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePriceInfoDto } from 'src/dto/create-price-info.dto';
import { CreateSeatsInfoDto } from 'src/dto/create-seats-info.dto';
import { CreateTheaterDto } from 'src/dto/create-theater.dto';
import { TheatersService } from 'src/services/theaters.service';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get('/')
  async getAllTheaterList() {
    return await this.theatersService.getAllTheaterList();
  }

  @Get('/info')
  async getAllTheaters() {
    return await this.theatersService.getAllTheaterInfo();
  }

  @Get('/myList/:userId')
  async getMyTheaterInfo(@Param('userId') userId: number) {
    return await this.theatersService.getMyTheaterInfo(userId);
  }

  @Post('/createTheater/:userId')
  createTheaterInfo(
    @Param('userId') userId: number,
    @Body() data: CreateTheaterDto
  ) {
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
