import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReviewDto {
  @IsString()
  readonly performId: string;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly review: string;
}
