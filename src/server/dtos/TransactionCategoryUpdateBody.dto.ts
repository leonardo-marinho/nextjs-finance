import { IsOptional, IsString } from 'class-validator';

export class TransactionCategoryUpdateBody {
  @IsOptional()
  @IsString()
  name: string;
}
