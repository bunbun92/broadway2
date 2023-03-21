import { IsNumber } from 'class-validator';

export class CreateSeatsInfoDto {
  @IsNumber()
  readonly theaterId: number;

  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly rowMax: number;

  @IsNumber()
  readonly columnMax: number;
}
