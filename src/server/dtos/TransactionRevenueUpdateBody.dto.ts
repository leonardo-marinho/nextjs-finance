import { TransactionCategoryType } from '@/lib/enums/Transaction';
import { TransactionTransferVariant } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBooleanString,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TransactionRevenueUpdateBody {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsInt()
  bankAccountId?: number;

  @IsOptional()
  @IsDateString()
  calculationDate?: Date;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsEnum(TransactionCategoryType)
  categoryType?: TransactionCategoryType;

  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBooleanString()
  ignoreTransaction?: boolean;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags?: string[];

  @IsOptional()
  @IsEnum(TransactionTransferVariant)
  variant?: TransactionTransferVariant;
}
