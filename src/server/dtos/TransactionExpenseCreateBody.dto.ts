import { TransactionCategoryType, TransactionPaymentMethodType } from '@/lib/enums/Transaction';
import { IsDateString, IsEnum, IsInt, IsNumber, IsString } from 'class-validator';

export class TransactionExpenseCreateBody {
  @IsNumber()
  amount: number;

  @IsInt()
  categoryId: number;

  @IsEnum(TransactionCategoryType)
  categoryType: TransactionCategoryType;

  @IsDateString()
  date: Date;

  @IsString()
  description: string;

  @IsInt()
  paymentMethodId: number;

  @IsEnum(TransactionPaymentMethodType)
  paymentMethodType: TransactionPaymentMethodType;
}
