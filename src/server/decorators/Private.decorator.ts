import config from '@/lib/config';
import { ApiInternalServerErrorException } from '@/lib/exceptions/ApiInternalServerError.exception';
import { ApiUnauthorizedException } from '@/lib/exceptions/ApiUnauthorized.exception';
import { NextApiRequest, NextApiResponse } from 'next';

import AuthService from '../services/Auth.service';

const Private = (_: unknown, __: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;

  descriptor.value = async (req: NextApiRequest, res: NextApiResponse, next: unknown) => {
    if (config.node.isDevEnv()) {
      return await originalMethod.apply(this, [req, res, next]);
    }

    const token = req.headers?.authorization;
    if (!token) throw new ApiUnauthorizedException('Unauthorized');

    try {
      AuthService.verifyRefreshToken(token);
      Object.defineProperty(this, 'isPrivate', { value: true, writable: true });
    } catch (error) {
      throw new ApiInternalServerErrorException('Failed to verify token');
    }

    return await originalMethod.apply(this, [req, res, next]);
  };

  return descriptor;
};

export default Private;
