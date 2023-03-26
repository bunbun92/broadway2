import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReviewDto {
  @Type(() => Number)
  @IsNumber()
  readonly rating: number;

  @Type(() => String)
  @IsString()
  readonly review: string;
}
