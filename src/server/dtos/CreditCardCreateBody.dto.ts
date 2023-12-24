import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreditCardCreateBody {
  @IsInt()
  bankAccountId: number;

  @IsNumber()
  limit: number;

  @IsString()
  name: string;
}
