import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

import { CreditCardFindManyFilters } from './CreditCardFindManyFilters.dto';

export class CreditCardFindManyBody {
  @IsOptional()
  @Type(() => CreditCardFindManyFilters)
  filters?: CreditCardFindManyFilters;
}
