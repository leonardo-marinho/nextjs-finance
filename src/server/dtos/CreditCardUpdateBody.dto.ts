import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreditCardUpdateBody {
  @IsOptional()
  @IsInt()
  bankAccountId?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsString()
  name?: string;
}
