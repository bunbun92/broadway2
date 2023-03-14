import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @Type(() => Number)
  @IsNumber()
  readonly userType: number;
}
