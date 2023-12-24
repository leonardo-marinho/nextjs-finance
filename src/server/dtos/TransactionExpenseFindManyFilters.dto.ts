import { Type } from 'class-transformer';
import { IsArray, IsDate, IsOptional } from 'class-validator';

export class TransactionExpenseFindManyFilters {
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  bankAccountIds: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  categoryIds: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  creditCardIds: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  dates: Date[];

  @IsOptional()
  @IsDate()
  endDate: Date;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  ids: number[];

  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  subCategoryIds: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  userIds: number[];
}
