import prisma from '@/lib/database';

import { AuthSignUpBodyDto } from '../dtos/AuthSignUpBody.dto';

class UserService {
  async getByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async register(body: AuthSignUpBodyDto) {
    return await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
  }
}

export default new UserService();
