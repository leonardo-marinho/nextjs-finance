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
  @IsInt()
  paymentMethodId?: number;

  @IsOptional()
  @IsEnum(TransactionPaymentMethodType)
  paymentMethodType?: TransactionPaymentMethodType;
}
