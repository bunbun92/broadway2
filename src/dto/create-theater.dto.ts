import { IsString } from 'class-validator';

export class CreateTheaterDto {
  @IsString()
  readonly theater: string;
}
