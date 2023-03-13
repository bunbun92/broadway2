import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  readonly reviewId: number;

  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly comment: string;
}
