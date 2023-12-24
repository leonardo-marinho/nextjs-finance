import config from '@/lib/config';
import { ApiAuthException } from '@/lib/exceptions/ApiAuth.exception';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

class AuthService {
  secret = config.jwt.secret;

  extractUserId(token?: string): number {
    if (!token) throw new ApiAuthException('No token provided');

    const payload = jwt.verify(token, this.secret);
    return (payload as User).id;
  }

  generateRefreshToken(user: Partial<User>) {
    const payload = { ...user };
    const options = { expiresIn: config.jwt.expiresIn };

    return jwt.sign(payload, this.secret, options);
  }

  signIn(user: Partial<User>) {
    const payload = { ...user };
    return jwt.sign(payload, this.secret);
  }

  verifyRefreshToken(token?: string): boolean {
    if (!token) throw new Error('No token provided');

    jwt.verify(token, this.secret);
    return true;
  }
}

export default new AuthService();
