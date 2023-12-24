import { BankAccountType } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class BankAccountCreateBody {
  @IsString()
  name: string;

  @IsEnum(BankAccountType)
  type: BankAccountType;
}
