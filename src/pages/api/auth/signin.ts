import AuthController from '@/server/controllers/Auth.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  post: AuthController.signIn,
});

export default handler;
