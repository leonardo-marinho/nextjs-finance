import prisma from '@/lib/database';
import { ApiAuthException } from '@/lib/exceptions/ApiAuth.exception';
import bcrypt from 'bcryptjs';
import { omit } from 'lodash';

import { AuthSignInBody } from '../dtos/AuthSignInBody.dto';
import { AuthSignUpBody } from '../dtos/AuthSignUpBody.dto';
import AuthService from './Auth.service';

class UserService {
  async getByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async login(body: AuthSignInBody) {
    const user = await this.getByEmail(body.email);
    if (!user) throw new ApiAuthException('User with this email does not exist');
    if (!bcrypt.compareSync(body.password, user.password))
      throw new ApiAuthException('Invalid password');
    const userWithoutPassword = omit(user, 'password');
    const token = AuthService.signIn(userWithoutPassword);
    const refreshToken = AuthService.generateRefreshToken(userWithoutPassword);
    return {
      refreshToken,
      token,
    };
  }

  async register(body: AuthSignUpBody) {
    if (await this.getByEmail(body.email))
      throw new ApiAuthException('User with this email already exists');

    const hashedPassword = bcrypt.hashSync(body.password, 8);

    return await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    });
  }
}

export default new UserService();
