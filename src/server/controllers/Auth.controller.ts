import Body from '../decorators/Body.decorator';
import Endpoint from '../decorators/Endpoint.decorator';
import { AuthSignInBodyDto } from '../dtos/AuthSignInBody.dto';
import { AuthSignInResponseDto } from '../dtos/AuthSignInResponse.dto';
import { AuthSignUpBodyDto } from '../dtos/AuthSignUpBody.dto';
import UserService from '../services/User.service';
import { parsePayload } from '../utils/Api.utils';

class AuthController {
  @Endpoint
  async signIn(@Body body: AuthSignInBodyDto): Promise<AuthSignInResponseDto> {
    body = await parsePayload(body, AuthSignInBodyDto);
    return await UserService.login(body);
  }

  @Endpoint
  async signUp(@Body body: AuthSignUpBodyDto): Promise<boolean> {
    body = await parsePayload(body, AuthSignUpBodyDto);
    await UserService.register(body);
    return true;
  }
}

export default new AuthController();
