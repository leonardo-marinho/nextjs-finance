import config from '@/lib/config';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

class AuthService {
  secret = config.jwt.secret;

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
