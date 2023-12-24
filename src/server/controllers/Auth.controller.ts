import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import { AuthSignInBody } from '../dtos/AuthSignInBody.dto';
import { AuthSignInResponse } from '../dtos/AuthSignInResponse.dto';
import { AuthSignUpBody } from '../dtos/AuthSignUpBody.dto';
import UserService from '../services/User.service';

class AuthController {
  @Endpoint()
  async signIn(
    @Body({ schema: AuthSignInBody }) body: AuthSignInBody,
  ): Promise<AuthSignInResponse> {
    return await UserService.login(body);
  }

  @Endpoint()
  async signUp(@Body({ schema: AuthSignUpBody }) body: AuthSignUpBody): Promise<boolean> {
    await UserService.register(body);
    return true;
  }
}

export default new AuthController();
