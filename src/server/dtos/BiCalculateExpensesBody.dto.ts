import { Type } from 'class-transformer';

import { BiCalculateExpensesFilters } from './BiCalculateExpensesFilters.dto';

export class BiCalculateExpensesBody {
  @Type(() => BiCalculateExpensesFilters)
  filters: BiCalculateExpensesFilters;
}
