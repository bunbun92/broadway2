import { IsNumber, IsString } from 'class-validator';

export class CreatePerformDto {
  @IsNumber()
  readonly stdate: number;

  @IsNumber()
  readonly eddate: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly theater: string;

  @IsString()
  readonly theaterCode: string;

  @IsString()
  readonly genreCode: string;

  @IsNumber()
  readonly status: number;
}
