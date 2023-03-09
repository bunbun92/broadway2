import { IsNumber, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsNumber()
  readonly reviewId: number;

  @IsNumber()
  readonly contentId: number;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly review: string;
}
