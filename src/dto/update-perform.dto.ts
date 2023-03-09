import { PickType } from '@nestjs/mapped-types';
import { CreatePerformDto } from './create-perform.dto';

export class UpdatePerformDto extends PickType(CreatePerformDto, [
  'performRound',
  'performDate',
  'performTime',
] as const) {}
