import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreatePerformDto {
  @Type(() => Number)
  @IsNumber()
  readonly performRound: number;

  @IsString()
  readonly performDate: string;

  @IsString()
  readonly performTime: string;
}
