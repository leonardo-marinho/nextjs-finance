import { TransactionCategoryType } from '@/lib/enums/Transaction';
import { IsDateString, IsEnum, IsInt, IsNumber, IsString } from 'class-validator';

export class TransactionRevenueCreateBody {
  @IsNumber()
  amount: number;

  @IsInt()
  bankAccountId: number;

  @IsInt()
  categoryId: number;

  @IsEnum(TransactionCategoryType)
  categoryType: TransactionCategoryType;

  @IsDateString()
  date: Date;

  @IsString()
  description: string;
}
