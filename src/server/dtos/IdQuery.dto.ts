import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class IdQuery {
  @IsNumber()
  @Transform((params: TransformFnParams) => Number.parseInt(params.value, 10))
  id: number;
}
