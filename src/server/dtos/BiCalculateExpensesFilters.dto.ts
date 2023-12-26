import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsInt, IsOptional } from 'class-validator';

export class BiCalculateExpensesFilters {
  @IsOptional()
  @IsInt()
  bankAccountId?: number;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  categoryIds?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  creditCardId?: number[];

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  subCategoryIds?: number[];
}
