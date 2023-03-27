import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from '../services/content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

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
