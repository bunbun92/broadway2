import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCommentDto {
  @IsString()
  readonly comment: string;
}
