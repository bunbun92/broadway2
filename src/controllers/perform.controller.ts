import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePerformDto } from '../dto/create-perform.dto';
import { UpdatePerformDto } from '../dto/update-perform.dto';
import { PerformService } from '../services/perform.service';

@Controller('perform')
export class PerformController {
  constructor(private readonly performService: PerformService) {}

  @Get('/performance')
  async getPerforms() {
    return await this.performService.getPerforms();
  }

  @Get('/performance/:userId')
  async getMyPerforms(@Param('userId') userId: number) {
    return await this.performService.getMyPerforms(userId);
  }

  @Post('/performance/:performId')
  createPerform(
    @Param('performId') performId: string,
    @Body() data: CreatePerformDto
  ) {
    return this.performService.createPerform(
      performId,
      data.performRound,
      data.performDate,
      data.performTime,
      data.userId // userId webtoken 으로 수정 필요
    );
  }

  @Put('/performance/:contentId/:userId') // userId webtoken 으로 수정 필요
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

  @Delete('/performance/:contentId') // user authorization 추가 필요
  deletePerform(@Param('contentId') contentId: string) {
    return this.performService.deletePerform(contentId);
  }
}
