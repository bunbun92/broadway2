import { IsNumber, IsString } from 'class-validator';

export class CreatePriceInfoDto {
  @IsNumber()
  readonly grade: number;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly performId: string;

  @IsNumber()
  readonly theaterId: number;

  @IsNumber()
  readonly userId: number;
}
