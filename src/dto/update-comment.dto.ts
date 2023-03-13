import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommentDto {
  @Type(() => Number)
  @IsNumber()
  readonly reviewId: number;

  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly comment: string;
}
