import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

export class CreditCardFindManyFilters {
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  bankAccountIds: number[];

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
  @Type(() => Number)
  userIds: number[];
}
