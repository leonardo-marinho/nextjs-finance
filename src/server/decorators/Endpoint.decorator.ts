import config from '@/lib/config';
import { ApiBodyValidationException } from '@/lib/exceptions/ApiBodyValidation.exception';
import { ApiInternalServerErrorException } from '@/lib/exceptions/ApiInternalServerError.exception';
import { ApiQueryValidationException } from '@/lib/exceptions/ApiQueryValidation.exception';
import { ApiUnauthorizedException } from '@/lib/exceptions/ApiUnauthorized.exception';
import { ClassConstructor } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import 'reflect-metadata';

import AuthService from '../services/Auth.service';
import { parsePayload } from '../utils/Api.utils';
import { getArgRequestMetadata, processArgRequestMetadata } from '../utils/Decorator.utils';

interface EndpointOptions {
  private?: boolean;
}

const Endpoint =
  (options?: EndpointOptions) =>
  (target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async (req: NextApiRequest, res: NextApiResponse) => {
      if (options?.private && !config.node.isDevEnv()) {
        const token = req.headers?.authorization;
        if (!token) throw new ApiUnauthorizedException('Unauthorized');
        try {
          AuthService.verifyRefreshToken(token);
          Object.defineProperty(this, 'isPrivate', { value: true, writable: true });
        } catch (error) {
          throw new ApiInternalServerErrorException('Failed to verify token');
        }
      }

      const args: unknown[] = [];

      const token = req.headers?.authorization;
      const userId = config.node.isDevEnv() ? 1 : AuthService.extractUserId(token);

      const bodySchema = getArgRequestMetadata<ClassConstructor<unknown>>(
        'bodySchema',
        target,
        propertyKey,
      );
      let body: unknown = req.body;
      try {
        if (bodySchema) body = await parsePayload(body || {}, bodySchema);
      } catch (error) {
        throw new ApiBodyValidationException(error as ValidationError[]);
      }

      const querySchema = getArgRequestMetadata<ClassConstructor<unknown>>(
        'querySchema',
        target,
        propertyKey,
      );
      let query: unknown = req.query;
      try {
        if (querySchema) query = await parsePayload(query || {}, querySchema);
      } catch (error) {
        throw new ApiQueryValidationException(error as ValidationError[]);
      }

      processArgRequestMetadata('userId', userId, args, target, propertyKey);
      processArgRequestMetadata('body', body, args, target, propertyKey);
      processArgRequestMetadata('query', query, args, target, propertyKey);
      processArgRequestMetadata('req', req, args, target, propertyKey);
      processArgRequestMetadata('res', res, args, target, propertyKey);

      return await originalMethod.apply(this, args);
    };

    return descriptor;
  };

export default Endpoint;
