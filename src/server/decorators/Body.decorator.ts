import { ClassConstructor } from 'class-transformer';

import { generateArgRequestMetadata } from '../utils/Decorator.utils';

interface BodyOptions {
  schema?: ClassConstructor<unknown>;
}

const Body = (options?: BodyOptions) => {
  return (target: object, propertyKey: string | symbol, argIndex: number) => {
    generateArgRequestMetadata('body', target, propertyKey, argIndex);
    if (options?.schema)
      generateArgRequestMetadata('bodySchema', target, propertyKey, options?.schema);
  };
};

export default Body;
