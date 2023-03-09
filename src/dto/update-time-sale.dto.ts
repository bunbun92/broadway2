import { PartialType } from '@nestjs/mapped-types';
import { CreateTimeSaleDto } from './create-time-sale.dto';

export class UpdateTimeSaleDto extends PartialType(CreateTimeSaleDto) {}
