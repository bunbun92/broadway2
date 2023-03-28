import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreatePriceInfoDto {
  @Type(() => Number)
  @IsNumber()
  readonly grade: number;

  @Type(() => Number)
  @IsNumber()
  readonly price: number;

  @IsString()
  readonly performId: string;

  @Type(() => Number)
  @IsNumber()
  readonly theaterId: number;
}
