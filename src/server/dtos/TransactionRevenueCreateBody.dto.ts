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

export class TransactionRevenueCreateBody {
  @IsNumber()
  amount: number;

  @IsInt()
  bankAccountId: number;

  @IsOptional()
  @IsDateString()
  calculationDate?: Date;

  @IsInt()
  categoryId: number;

  @IsEnum(TransactionCategoryType)
  categoryType: TransactionCategoryType;

  @IsDateString()
  date: Date;

  @IsString()
  description: string;

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
