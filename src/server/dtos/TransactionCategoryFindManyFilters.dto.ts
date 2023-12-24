import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class TransactionCategoryFindManyFilters {
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  ids: number[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  names: string[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  userIds: number[];
}
