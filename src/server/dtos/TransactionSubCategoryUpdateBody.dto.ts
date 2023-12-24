import { IsOptional, IsString } from 'class-validator';

export class TransactionSubCategoryUpdateBody {
  @IsOptional()
  @IsString()
  name: string;
}
