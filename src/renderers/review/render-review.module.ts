import { Module } from '@nestjs/common';
import { ReviewController } from './render-review.controller';

@Module({
  controllers: [ReviewController],
})
export class ReviewModule {}
