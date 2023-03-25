import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class DeleteOrderSeatsByOrderIdDto {
  @Type(() => Number)
  @IsNumber()
  readonly orderId: number;
}
