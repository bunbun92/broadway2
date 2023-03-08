import { IsNumber, IsString } from 'class-validator';

export class CreatePerformDto {
  @IsNumber()
  readonly performRound: number;

  @IsString()
  readonly performDate: string;

  @IsString()
  readonly performTime: string;

  // jwt 사용시 userId 삭제
  @IsNumber()
  readonly userId: number;
}
