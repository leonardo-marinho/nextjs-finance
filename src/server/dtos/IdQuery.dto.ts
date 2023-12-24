import { Transform, TransformFnParams } from 'class-transformer';
import { IsInt } from 'class-validator';

export class IdQuery {
  @IsInt()
  @Transform((params: TransformFnParams) => Number.parseInt(params.value, 10))
  id: number;
}
