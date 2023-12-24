import { TransactionCategoryType, TransactionPaymentMethodType } from '@/lib/enums/Transaction';
import { IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class TransactionExpenseUpdateBody {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsEnum(TransactionCategoryType)
  categoryType?: TransactionCategoryType;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  paymentMethodId?: number;

  @IsOptional()
  @IsEnum(TransactionPaymentMethodType)
  paymentMethodType?: TransactionPaymentMethodType;
}
