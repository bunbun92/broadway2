import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('/:contentId')
  async getReviewSpec(@Param('contentId') contentId: number) {
    const review = await this.reviewService.getReviewSpec(contentId);

    return review;
  }

  @Post('/')
  createReview(@Body() data: CreateReviewDto) {
    return this.reviewService.createReview(
      data.contentId,
      data.userId,
      data.rating,
      data.review
    );
  }

  @Put('/performance/:prfmId')
  updatePerform(
    @Param('prfmId') prfmId: number,
    @Body() data: CreateReviewDto
  ) {
    return this.reviewService.updateReview(
      data.contentId,
      data.userId,
      data.rating,
      data.review
    );
  }
}
