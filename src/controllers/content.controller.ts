import { Controller, Get, Param, Req } from '@nestjs/common';
import { ContentService } from '../services/content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get('/getAll')
  async getAllperforms() {
    return await this.contentService.getAllperforms();
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

  @Get('/onePerform/')
  async getPerformById(@Param('performId') performId: string) {
    return await this.contentService.getPerformById(performId);
  }
}
