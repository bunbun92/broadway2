import { PartialType } from '@nestjs/mapped-types';
import { IsArray } from 'class-validator';
import { CreateOrderSeatsDto } from './create-order-seats.dto';

export class UpdateOrderSeatsDto extends PartialType(CreateOrderSeatsDto) {
  @IsArray()
  readonly seatsBefore: Array<string>;

  @IsArray()
  readonly seatsAfter: Array<string>;
}
