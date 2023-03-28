import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateTimeSaleDto {
  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;

  @Type(() => Number)
  @IsNumber()
  readonly rate: number;
}
