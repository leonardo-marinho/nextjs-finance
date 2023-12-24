import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { TransactionSubCategoryFindManyFilters } from './TransactionSubCategoryFindManyFilters.dto';

export class TransactionSubCategoryFindManyBody {
  @IsOptional()
  @Type(() => TransactionSubCategoryFindManyFilters)
  filters?: TransactionSubCategoryFindManyFilters;
}
