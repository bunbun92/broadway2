import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserInfoByIdDto {
  @Type(() => Number)
  @IsNumber()
  readonly id: number;
}
