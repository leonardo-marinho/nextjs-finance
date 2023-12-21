import { omit } from 'lodash';

import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import Private from '../decorators/Private.decorator';
import { AuthSignInBodyDto } from '../dtos/AuthSignInBody.dto';
import { AuthSignInResponseDto } from '../dtos/AuthSignInResponse.dto';
import { AuthSignUpBodyDto } from '../dtos/AuthSignUpBody.dto';
import AuthService from '../services/Auth.service';
import UserService from '../services/User.service';
import { parsePayload } from '../utils/Api.utils';

class AuthController {
  @Endpoint
  async signIn(@Body body: AuthSignInBodyDto): Promise<AuthSignInResponseDto> {
    body = await parsePayload(body, AuthSignInBodyDto);
    const user = await UserService.getByEmail(body.email);
    if (!user) throw new Error('User with this email does not exist');
    const userWithoutPassword = omit(user, 'password');
    const token = AuthService.signIn(userWithoutPassword);
    const refreshToken = AuthService.generateRefreshToken(userWithoutPassword);
    return {
      refreshToken,
      token,
    };
  }

  @Endpoint
  async signUp(@Body body: AuthSignUpBodyDto): Promise<boolean> {
    body = await parsePayload(body, AuthSignUpBodyDto);
    await UserService.register(body);
    return true;
  }

  @Private
  @Endpoint
  async test(): Promise<string> {
    return 'Hello World';
  }
}

export default new AuthController();
