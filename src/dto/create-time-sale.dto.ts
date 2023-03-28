import { IsNumber, IsString } from 'class-validator';

export class CreateTimeSaleDto {
  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;

  @IsNumber()
  readonly rate: number;
}
