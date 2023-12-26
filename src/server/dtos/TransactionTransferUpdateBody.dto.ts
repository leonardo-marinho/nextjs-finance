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

export class TransactionTransferUpdateBody {
  @IsOptional()
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsDateString()
  calculationDate?: Date;

  @IsOptional()
  @IsInt()
  categoryId: number;

  @IsOptional()
  @IsEnum(TransactionCategoryType)
  categoryType: TransactionCategoryType;

  @IsOptional()
  @IsDateString()
  date: Date;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  destinationBankAccountId: number;

  @IsOptional()
  @IsBooleanString()
  ignoreTransaction?: boolean;

  @IsOptional()
  @IsString()
  observation?: string;

  @IsOptional()
  @IsInt()
  originBankAccountId: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  tags?: string[];
}
