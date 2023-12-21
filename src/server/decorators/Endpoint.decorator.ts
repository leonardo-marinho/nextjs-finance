import { NextApiRequest, NextApiResponse } from 'next';
import 'reflect-metadata';

import { processArgRequestMetadata } from '../utils/Decorator.utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Endpoint = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async (req: NextApiRequest, res: NextApiResponse) => {
    const args: unknown[] = [];
    processArgRequestMetadata('body', req.body, args, target, propertyKey);
    processArgRequestMetadata('req', req, args, target, propertyKey);
    processArgRequestMetadata('res', res, args, target, propertyKey);

    return await originalMethod.apply(this, args);
  };

  return descriptor;
};

export default Endpoint;
