import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { TransactionTransferFindManyFilters } from './TransactionTransferFindManyFilters.dto';

export class TransactionTransferFindManyBody {
  @IsOptional()
  @Type(() => TransactionTransferFindManyFilters)
  filters?: TransactionTransferFindManyFilters;
}
