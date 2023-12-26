import { TransactionCategoryType } from '@/lib/enums/Transaction';
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

export class TransactionTransferCreateBody {
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

  @IsInt()
  destinationBankAccountId: number;

  @IsOptional()
  @IsBooleanString()
  ignoreTransaction?: boolean;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsInt()
  originBankAccountId: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags?: string[];
}
