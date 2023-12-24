import { IsString } from 'class-validator';

export class TransactionCategoryCreateBody {
  @IsString()
  name: string;
}
