import { TransactionCategoryType, TransactionPaymentMethodType } from '@/lib/enums/Transaction';
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

export class TransactionExpenseUpdateBody {
  @IsOptional()
  @IsNumber()
  amount?: number;

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
  @IsInt()
  installments?: number;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsInt()
  paymentMethodId?: number;

  @IsOptional()
  @IsEnum(TransactionPaymentMethodType)
  paymentMethodType?: TransactionPaymentMethodType;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags?: string[];

  @IsOptional()
  @IsEnum(TransactionTransferVariant)
  variant?: TransactionTransferVariant;
}
