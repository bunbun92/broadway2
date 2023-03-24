import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  readonly performId: string;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly review: string;
}
