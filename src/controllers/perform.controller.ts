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

  @Get('/performance/:thtrId')
  async getMyPerforms(@Param('thtrId') thtrId: string) {
    return await this.performService.getMyPerforms(thtrId);
  }

  @Post('/performance')
  createPerform(@Body() data: CreatePerformDto) {
    return this.performService.createPerform(
      data.stdate,
      data.eddate,
      data.title,
      data.theater,
      data.theaterCode,
      data.genreCode,
      data.status
    );
  }

  @Put('/performance/:prfmId')
  updatePerform(
    @Param('prfmId') prfmId: number,
    @Body() data: UpdatePerformDto
  ) {
    return this.performService.updatePerform(
      prfmId,
      data.stdate,
      data.eddate,
      data.title,
      data.theater,
      data.theaterCode,
      data.genreCode,
      data.status
    );
  }

  @Delete('/performance/:prfmId')
  deletePerform(@Param('prfmId') prfmId: number) {
    return this.performService.deletePerform(prfmId);
  }
}
