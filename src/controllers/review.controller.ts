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

  // 전체 리뷰목록 조회
  @Get('/')
  async getAllReviews() {
    const review = await this.reviewService.getAllReviews();

    return review;
  }
  // / review/1/reviews
  // 특정 공연 리뷰목록 조회
  @Get('/:performId/reviews')
  async getReviewsByPerformId(@Param('performId') performId: string) {
    const review = await this.reviewService.getReviewsByPerformId(performId);

    return review;
  }

  // 리뷰 상세내용 조희
  @Get('/:id')
  async getReviewSpec(@Param('id') reviewId: number) {
    const review = await this.reviewService.getReviewSpec(reviewId);

    return review;
  }

  // 리뷰 작성
  @Post('/')
  createReview(@Body() data: CreateReviewDto) {
    return this.reviewService.createReview(
      data.performId,
      data.userId,
      data.rating,
      data.review
    );
  }

  // 리뷰 수정
  @Put('/:id')
  updateReview(@Param('id') reviewId: number, @Body() data: UpdateReviewDto) {
    return this.reviewService.updateReview(
      reviewId,
      data.performId,
      data.userId,
      data.rating,
      data.review
    );
  }

  // 리뷰 삭제
  @Delete('/:id')
  deleteReview(@Param('id') reviewId: number) {
    return this.reviewService.deleteReview(reviewId);
  }
}
