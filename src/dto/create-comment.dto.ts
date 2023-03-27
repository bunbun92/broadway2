import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @Type(() => Number)
  @IsNumber()
  readonly reviewId: number;

  @Type(() => String)
  @IsString()
  readonly comment: string;
}
