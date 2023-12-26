import { TransactionTransferVariant } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsBooleanString, IsDateString, IsOptional } from 'class-validator';

export class TransactionExpenseFindManyFilters {
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  bankAccountIds?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  calculationDates?: Date[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  categoryIds?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  creditCardIds?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => Date)
  dates?: Date[];

  @IsOptional()
  @IsDateString()
  endCalculationDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  ids?: number[];

  @IsOptional()
  @IsBooleanString()
  ignoredTransactions?: boolean;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  installments?: number[];

  @IsOptional()
  @IsDateString()
  startCalculationDate?: Date;

  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  subCategoryIds?: number[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  userIds?: number[];

  @IsOptional()
  @IsArray()
  variants?: TransactionTransferVariant[];
}
