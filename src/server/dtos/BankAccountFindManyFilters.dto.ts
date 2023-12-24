import { BankAccountType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class BankAccountFindManyFilters {
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  ids: number[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  names: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  types: BankAccountType[];

  @IsOptional()
  @IsArray()
  @Type(() => Number)
  userIds: number[];
}
