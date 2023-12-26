import BiController from '@/server/controllers/Bi.controller';
import ApiService from '@/server/services/Api.service';

const handler = ApiService.handler({
  get: BiController.getExpenses,
});

export default handler;
