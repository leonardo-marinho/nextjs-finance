import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { TransactionExpenseFindManyFilters } from './TransactionExpenseFindManyFilters.dto';

export class TransactionExpenseFindManyBody {
  @IsOptional()
  @Type(() => TransactionExpenseFindManyFilters)
  filters?: TransactionExpenseFindManyFilters;
}
