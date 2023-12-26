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

export class TransactionExpenseCreateBody {
  @IsNumber()
  amount: number;

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
  @IsInt()
  installments?: number;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsInt()
  paymentMethodId: number;

  @IsEnum(TransactionPaymentMethodType)
  paymentMethodType: TransactionPaymentMethodType;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags?: string[];

  @IsOptional()
  @IsEnum(TransactionTransferVariant)
  variant?: TransactionTransferVariant;
}
