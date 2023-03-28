import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @Type(() => String)
  @IsString()
  readonly performId: string;

  @Type(() => Number)
  @IsNumber()
  readonly rating: number;

  @Type(() => String)
  @IsString()
  readonly review: string;
}
