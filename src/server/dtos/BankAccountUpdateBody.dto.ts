import { BankAccountType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class BankAccountUpdateBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(BankAccountType)
  type?: BankAccountType;
}
