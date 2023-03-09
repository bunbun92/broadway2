import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>
  ) {}

  async getReviewSpec(contentId: number) {
    const review = await this.reviewRepository.findOne({
      where: {
        deletedAt: null,
        id: contentId,
      },
    });
    return { review };
  }

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

  deleteReview(id: number) {
    this.reviewRepository.softDelete(id);
  }
}
