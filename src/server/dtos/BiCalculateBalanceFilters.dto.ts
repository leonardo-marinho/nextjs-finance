import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class BiCalculateBalanceFilters {
  @IsOptional()
  @IsInt()
  bankAccountId?: number;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsDateString()
  startDate?: Date;
}
