import { IsArray, IsNumber, IsString } from 'class-validator';

export class DeleteOrderSeatsDto {
  @IsArray()
  readonly orderListIds: Array<number>;
}
