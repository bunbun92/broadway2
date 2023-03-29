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
import { CreatePerformDto } from '../dto/create-perform.dto';
import { UpdatePerformDto } from '../dto/update-perform.dto';
import { PerformService } from '../services/perform.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('perform')
export class PerformController {
  constructor(
    private readonly performService: PerformService,
    private jwtService: JwtService
  ) {}

  // @Get('/performance')
  // async getPerforms() {
  //   return await this.performService.getPerforms();
  // }

  @Get('/myContentsTheater/:performId')
  async getMyTheatersByPerformId(
    @Req() req: Request,
    @Param('performId') performId: string
  ) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    return await this.performService.getMyTheatersByPerformId(
      performId,
      userId
    );
  }

  @Get('/myContentsList/:performId')
  async getMyContents(
    @Req() req: Request,
    @Param('performId') performId: string
  ) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    return await this.performService.getMyContents(performId, userId);
  }

  @Get('/myPerformList')
  async getMyPerforms(@Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    return await this.performService.getMyPerforms(userId);
  }

  @Post('/myPerformList/:performId')
  createPerform(
    @Req() req: Request,
    @Param('performId') performId: string,
    @Body() data: CreatePerformDto
  ) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    return this.performService.createPerform(
      performId,
      data.performRound,
      data.performDate,
      data.performTime,
      userId
    );
  }

  @Put('/myPerformList/:contentId/:userId') // userId webtoken 으로 수정 필요
  updatePerform(
    @Param('contentId') contentId: number,
    @Param('userId') userId: number,
    @Body() data: UpdatePerformDto
  ) {
    return this.performService.updatePerform(
      contentId,
      data.performRound,
      data.performDate,
      data.performTime,
      userId
    );
  }

  @Delete('/myPerformList/:contentId') // user authorization 추가 필요
  deletePerform(@Param('contentId') contentId: string) {
    return this.performService.deletePerform(contentId);
  }
}
