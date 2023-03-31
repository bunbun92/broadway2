import { Controller, Get, Param, Req } from '@nestjs/common';
import { ContentService } from '../services/content.service';
import { Response, Request } from 'express';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // 검색페이지 검색 결과 불러오기 - 페이지네이션
  @Get('/getSearch/:search')
  async getPerformsBySearch(
    @Req() req: Request,
    @Param('search') search: string
  ) {
    let limit = 12;
    let offset = 0 + (Number(req.query.page) - 1) * limit;
    console.log('컨트롤러', search);

    return await this.contentService.getPerformsBySearch(limit, offset, search);
  }

  // perform table '공연중'인 공연정보 불러오기 - 페이지네이션
  @Get('/getAllContents')
  async getAllContentsToHome(@Req() req: Request) {
    let limit = 12;
    let offset = 0 + (Number(req.query.page) - 1) * limit;
    return await this.contentService.getAllPerformsToHome(limit, offset);
  }

  // content table의 모든 공연정보 불러오기 - 페이지네이션
  @Get('/getAll')
  async Allcontents(@Req() req: Request) {
    let limit = 12;
    let offset = 0 + (Number(req.query.page) - 1) * limit;
    return await this.contentService.getContentsToHome(limit, offset);
  }

  // 퍼폼아이디로 공연정보 한개만 불러오기
  @Get('/onePerform/:performId')
  async getPerformById(@Param('performId') performId: string) {
    console.log(performId);
    return await this.contentService.getPerformById(performId);
  }

  @Get('/')
  async getAllContents() {
    return await this.contentService.getAllContents();
  }

  @Get('/getone')
  async getOneContent() {
    return await this.contentService.getOneContent();
  }
}
