import AuthController from '@/server/controllers/Auth.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: AuthController.test,
});

export default handler;
