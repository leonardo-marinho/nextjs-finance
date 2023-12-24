import { ClassConstructor } from 'class-transformer';

import { generateArgRequestMetadata } from '../utils/Decorator.utils';

interface QueryOptions {
  schema?: ClassConstructor<unknown>;
}

const Query = (options?: QueryOptions) => {
  return (target: object, propertyKey: string | symbol, argIndex: number) => {
    generateArgRequestMetadata('query', target, propertyKey, argIndex);
    if (options?.schema)
      generateArgRequestMetadata('querySchema', target, propertyKey, options?.schema);
  };
};

export default Query;
