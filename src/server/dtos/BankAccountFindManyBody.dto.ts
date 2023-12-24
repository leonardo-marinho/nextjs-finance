import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { BankAccountFindManyFilters } from './BankAccountFindManyFilters.dto';

export class BankAccountFindManyBody {
  @IsOptional()
  @Type(() => BankAccountFindManyFilters)
  filters?: BankAccountFindManyFilters;
}
