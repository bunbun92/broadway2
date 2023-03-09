import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>
  ) {}

  // 전체 리뷰목록 조회
  async getAllReviews() {
    const AllReviews = await this.reviewRepository.find({
      where: {
        deletedAt: null,
      },
    });
    return { AllReviews };
  }
  // 특정 공연 리뷰목록 조회
  async getReviewsByContentId(contentId: number) {
    const reviews = await this.reviewRepository.find({
      where: {
        deletedAt: null,
        contentId: contentId,
      },
    });
    return { reviews };
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

  // 리뷰 작성
  createReview(
    contentId: number,
    userId: number,
    rating: number,
    review: string
  ) {
    this.reviewRepository.insert({
      contentId,
      userId,
      rating,
      review,
    });
  }

  // 리뷰 수정
  async updateReview(
    id: number,
    contentId: number,
    userId: number,
    rating: number,
    review: string
  ) {
    await this.reviewRepository.update(
      { id },
      { contentId, userId, rating, review }
    );
  }

  // 리뷰 삭제
  deleteReview(id: number) {
    this.reviewRepository.softDelete(id);
  }
}
