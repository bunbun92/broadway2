import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  readonly contentId: number;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly rating: number;

  @IsString()
  readonly review: string;
}
