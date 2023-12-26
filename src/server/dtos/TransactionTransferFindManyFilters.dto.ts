import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional } from 'class-validator';

export class TransactionTransferFindManyFilters {
  @IsOptional()
  @IsInt()
  expenseId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  ids?: number[];

  @IsOptional()
  @IsInt()
  revenueId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  userIds?: number[];
}
