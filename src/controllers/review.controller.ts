import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dto/create-review.dto';
import { UpdateReviewDto } from '../dto/update-review.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private jwtService: JwtService
  ) {}

  // 전체 리뷰 조회
  @Get('/')
  async getAllReviews() {
    const review = await this.reviewService.getAllReviews();

    return review;
  }

  // 리뷰 상세내용 조희
  @Get('/:id')
  async getReviewSpec(@Param('id') reviewId: number) {
    const review = await this.reviewService.getReviewSpec(reviewId);

    return review;
  }

  // 내가 쓴 모든 리뷰 조회
  @Get('/user/reviews')
  async getReviewsByUserId(@Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];
    const myReviews = await this.reviewService.getReviewsByUserId(userId);

    return myReviews;
  }

  // 특정 공연 리뷰 조회
  @Get('/:performId/reviews')
  async getReviewsByPerformId(@Param('performId') performId: string) {
    const review = await this.reviewService.getReviewsByPerformId(performId);

    return review;
  }

  // 리뷰 작성
  @Post('/create')
  createReview(@Body() data: CreateReviewDto, @Req() req: Request) {
    const jwt = req.cookies.jwt;
    const userId = this.jwtService.verify(jwt)['id'];

    return this.reviewService.createReview(
      data.performId,
      userId,
      data.rating,
      data.review
    );
  }

  // 리뷰 수정
  @Put('/update/:id')
  updateReview(@Param('id') reviewId: number, @Body() data: UpdateReviewDto) {
    return this.reviewService.updateReview(reviewId, data.rating, data.review);
  }

  // 리뷰 삭제
  @Delete('/delete/:id')
  deleteReview(@Param('id') reviewId: number) {
    return this.reviewService.deleteReview(reviewId);
  }
}
