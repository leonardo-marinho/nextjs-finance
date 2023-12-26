import { Type } from 'class-transformer';

import { BiCalculateBalanceFilters } from './BiCalculateBalanceFilters.dto';

export class BiCalculateBalanceBody {
  @Type(() => BiCalculateBalanceFilters)
  filters: BiCalculateBalanceFilters;
}
