import { Controller, Get, Param, Req } from '@nestjs/common';
import { ContentService } from '../services/content.service';
import { Response, Request } from 'express';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

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

  @Get('/getAllContents')
  async getAllContentsToHome(@Req() req: Request) {
    let limit = 12;
    let offset = 0 + (Number(req.query.page) - 1) * limit;
    return await this.contentService.getAllContentsToHome(limit, offset);
  }

  // @Get('/getAll')
  // async Allperforms(@Req() req: Request, ) {
  //   let limit = 3;
  //     let offset = 0 + (req.query.page - 1) * limit;
  //   return await this.contentService.Allperforms();
  // }

  @Get('/')
  async getAllContents() {
    return await this.contentService.getAllContents();
  }

  @Get('/getone')
  async getOneContent() {
    return await this.contentService.getOneContent();
  }

  @Get('/onePerform/:performId')
  async getPerformById(@Param('performId') performId: string) {
    console.log(performId);
    return await this.contentService.getPerformById(performId);
  }
}
