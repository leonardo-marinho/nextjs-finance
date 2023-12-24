import { IsInt, IsString } from 'class-validator';

export class TransactionSubCategoryCreateBody {
  @IsInt()
  categoryId: number;

  @IsString()
  name: string;
}
