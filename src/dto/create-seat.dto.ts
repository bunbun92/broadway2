import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateSeatDto {
  @IsString()
  readonly seat: string;

  @IsString()
  readonly theater: string;

  @Type(() => Number)
  @IsNumber()
  readonly contentId: number;

  @Type(() => Number)
  @IsNumber()
  readonly performInfo: number;

  @Type(() => Number)
  @IsNumber()
  readonly price: number;

  @Type(() => Number)
  @IsNumber()
  readonly orderStatus: number;
}
