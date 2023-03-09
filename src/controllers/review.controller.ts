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
import { UpdateReviewDto } from '../dto/update-review.dto';

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

  @Put('/:reviewId')
  updateReview(@Param('id') id: number, @Body() data: UpdateReviewDto) {
    return this.reviewService.updateReview(
      id,
      data.contentId,
      data.userId,
      data.rating,
      data.review
    );
  }

  @Delete('/:reviewId')
  deletePerform(@Param('id') id: number) {
    return this.reviewService.deleteReview(id);
  }
}
