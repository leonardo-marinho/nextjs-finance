import { TransactionCategoryType, TransactionPaymentMethodType } from '@/lib/enums/Transaction';
import {
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

  @IsInt()
  paymentMethodId: number;

  @IsEnum(TransactionPaymentMethodType)
  paymentMethodType: TransactionPaymentMethodType;
}
