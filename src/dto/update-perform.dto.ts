import { PartialType } from '@nestjs/mapped-types';
import { CreatePerformDto } from './create-perform.dto';

export class UpdatePerformDto extends PartialType(CreatePerformDto) {}
