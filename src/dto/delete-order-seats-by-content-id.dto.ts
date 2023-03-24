import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class DeleteOrderSeatsByContentIdDto {
  @Type(() => Number)
  @IsNumber()
  readonly contentId: number;
}
