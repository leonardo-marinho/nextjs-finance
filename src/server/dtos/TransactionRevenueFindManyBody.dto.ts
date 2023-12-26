import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { TransactionRevenueFindManyFilters } from './TransactionRevenueFindManyFilters.dto';

export class TransactionRevenueFindManyBody {
  @IsOptional()
  @Type(() => TransactionRevenueFindManyFilters)
  filters?: TransactionRevenueFindManyFilters;
}
