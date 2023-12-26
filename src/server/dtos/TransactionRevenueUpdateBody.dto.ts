import { TransactionCategoryType } from '@/lib/enums/Transaction';
import {
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
}
