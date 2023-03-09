import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReviewDto {
  @Type(() => Number)
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
