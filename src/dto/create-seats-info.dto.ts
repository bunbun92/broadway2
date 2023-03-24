import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateSeatsInfoDto {
  @Type(() => Number)
  @IsNumber()
  readonly theaterId: number;

  @Type(() => Number)
  @IsNumber()
  readonly maxRowIndex: number;

  @Type(() => Number)
  @IsNumber()
  readonly maxColumnIndex: number;
}
