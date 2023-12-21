import { ClassConstructor, plainToInstance } from 'class-transformer';

import { validateApiPayload } from './Validation.utils';

export const parsePayload = async <TPayload extends object, TClass>(
  payload: TPayload,
  classConstructor: ClassConstructor<TClass>,
) => {
  const instance = plainToInstance(classConstructor, payload);
  await validateApiPayload(instance as object);
  return instance;
};
