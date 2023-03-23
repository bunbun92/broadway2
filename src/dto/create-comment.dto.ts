import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  // @IsNumber()
  readonly userId: number;

  // @IsString()
  readonly comment: string;

  // @IsString()
  readonly reviewId: string;
}
