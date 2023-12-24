import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { TransactionCategoryFindManyFilters } from './TransactionCategoryFindManyFilters.dto';

export class TransactionCategoryFindManyBody {
  @IsOptional()
  @Type(() => TransactionCategoryFindManyFilters)
  filters?: TransactionCategoryFindManyFilters;
}
