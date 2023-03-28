import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>
  ) {}

  // 전체 리뷰 조회
  async getAllReviews() {
    const AllReviews = await this.reviewRepository.find({
      where: {
        deletedAt: null,
      },
    });
    return { AllReviews };
  }

  // 리뷰 상세내용 조희
  async getReviewSpec(id: number) {
    const review = await this.reviewRepository.findOne({
      where: {
        deletedAt: null,
        id: id,
      },
    });
    return { review };
  }

  // 내가 쓴 모든 리뷰 조회
  async getReviewsByUserId(userId: number) {
    const myReviews = await this.reviewRepository.find({
      where: {
        deletedAt: null,
        userId,
      },
    });
    return { myReviews };
  }

  // 특정 공연 리뷰 조회
  async getReviewsByPerformId(performId: string) {
    const reviews = await this.reviewRepository.find({
      where: {
        deletedAt: null,
        performId,
      },
    });
    return { reviews };
  }

  // 리뷰 작성
  createReview(
    performId: string,
    userId: number,
    rating: number,
    review: string
  ) {
    this.reviewRepository.insert({
      performId,
      userId,
      rating,
      review,
    });
  }

  // 리뷰 수정
  async updateReview(id: number, rating: number, review: string) {
    await this.reviewRepository.update({ id }, { rating, review });
  }

  // 리뷰 삭제
  deleteReview(id: number) {
    this.reviewRepository.softDelete(id);
  }
}
